import json
import torch
import os
import time
import scipy
from fastapi import FastAPI, Body
import uvicorn
from starlette.requests import Request
from pydantic import BaseModel
import asyncio
from sse_starlette import EventSourceResponse
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from typing import List
from fastapi.responses import StreamingResponse,Response
from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
import io
import numpy as np
import logging

logging.basicConfig(level=logging.DEBUG)
app = FastAPI()
gen_model_path = "/home/zxyu/private_data/pretrain/musicgen-small" # Replace with your own model path
synthesiser = pipeline("text-to-audio", gen_model_path)

polish_model_path = "/home/zxyu/private_data/pretrain/Qwen2.5-3B-Instruct" # Replace with your own model path
model = AutoModelForCausalLM.from_pretrained(
    polish_model_path,
    torch_dtype="auto",
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(polish_model_path)



@app.post("/musicgen")
async def musicgen(text: str = Body(..., embed=True)):
    music = synthesiser(text, forward_params={"do_sample": True})
    
    audio_array = music["audio"]
    if audio_array.ndim == 1:
        audio_array = np.expand_dims(audio_array, axis=0)
    samplerate = 32000
    audio_int16 = (audio_array * 32767).astype(np.int16)
    wav_buffer = io.BytesIO()
    scipy.io.wavfile.write(wav_buffer, samplerate, audio_int16.T)
    wav_buffer.seek(0)

    duration = audio_int16.shape[1] / samplerate
    logging.info(f"Generated audio: {duration:.2f}s, {samplerate/1000}kHz")
    return StreamingResponse(
        wav_buffer,
        media_type="audio/wav",
        headers={
            "Content-Disposition": "attachment; filename=generated_audio.wav",
        }
    )
    
@app.post("/polish")
async def polish(text: str = Body(..., embed=True)):
    prompt = "Given"
    messages = [
        {"role": "system", "content": "You are a helpful assistant that improves music generation prompts. Your task is to make prompts more detailed and specific for better music generation, while keeping the original intent. Respond ONLY with the improved prompt, without any explanations or additional text."},
        {"role": "user", "content": prompt}
    ]
    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=512
    )
    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
    print(response)
    return Response(response)       
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    

