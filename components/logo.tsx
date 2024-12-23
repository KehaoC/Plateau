// plateau/components/logo.tsx

import Image from 'next/image';

const Logo = () => {
    return (
        <div>
            <Image 
                src="/triody.svg" // 直接使用 SVG 文件的路径
                alt="Triody Logo" 
                width={250} 
                height={250}
            />
        </div>
    );
};

export default Logo;