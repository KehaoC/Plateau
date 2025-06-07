import pytest
from fastapi.testclient import TestClient
from run import app
from unittest.mock import patch, MagicMock
import numpy as np
import io
import scipy.io.wavfile

client = TestClient(app)

mock_audio_data = np.random.rand(1, 32000).astype(np.float32)

@patch('run.synthesiser')
def test_musicgen_endpoint(mock_synthesiser):
    mock_synthesiser.return_value = {"audio": mock_audio_data}
    
    response = client.post("/musicgen", json={"text": "test prompt"})

    assert response.status_code == 200
    assert response.headers["content-type"] == "audio/wav"

    wav_buffer = io.BytesIO(response.content)
    rate, data = scipy.io.wavfile.read(wav_buffer)
    assert rate == 32000
    assert data.shape == (32000,)

@patch('run.model.generate')
@patch('run.tokenizer')
def test_polish_endpoint(mock_tokenizer, mock_generate):
    mock_tokenizer.apply_chat_template.return_value = "chat template"
    mock_tokenizer.batch_decode.return_value = ["polished response"]
    mock_generate.return_value = [MagicMock()]

    response = client.post("/polish", json={"text": "original prompt"})

    assert response.status_code == 200
    assert response.text == "polished response"

def test_polish_endpoint_error_handling():
    response = client.post("/polish", content="invalid data")
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_musicgen_streaming():
    with patch('run.synthesiser') as mock_synthesiser:
        mock_synthesiser.return_value = {"audio": mock_audio_data}
        
        response = client.post("/musicgen", json={"text": "test"})
        assert response.status_code == 200
        