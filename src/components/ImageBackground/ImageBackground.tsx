import { Box } from '@mui/material';

const ImageBackground = ({ image }: { image: string }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: -1,
                filter: 'brightness(0.4)',
            }}
        />

    )
}

export default ImageBackground;