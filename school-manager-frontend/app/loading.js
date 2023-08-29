import {CircularProgress, LinearProgress} from '@mui/material';

export default function Loading() {
    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
                <LinearProgress />
            </div>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress size={80} />
            </div>
        </>
    );
}
