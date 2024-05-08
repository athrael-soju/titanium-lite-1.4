import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { IconButton, Tooltip } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { getAudioTranscript } from '@/app/services/speechToTextService';
import { useRecordVoice } from '@/app/hooks/useRecordVoice';

const Microphone = ({
  onAppendText,
}: {
  onAppendText: (text: string) => void;
}) => {
  const { startRecording, stopRecording } = useRecordVoice();
  const { setValue, watch } = useFormContext();
  const isSpeechToTextEnabled = watch('isSpeechToTextEnabled');
  async function handleMicrophoneClick(): Promise<void> {
    setValue('isSpeechToTextEnabled', !isSpeechToTextEnabled);
    if (!isSpeechToTextEnabled) {
      startRecording();
    } else {
      const blob = await stopRecording();
      const transcriptText = await getAudioTranscript({ blob });
      onAppendText(transcriptText);
    }
  }

  return (
    <Tooltip title={isSpeechToTextEnabled ? "Stop recording" : "Start recording"}>
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label={isSpeechToTextEnabled ? "Stop recording" : "Start recording"}
        tool-tip={isSpeechToTextEnabled ? "Stop recording" : "Start recording"}
        onClick={handleMicrophoneClick}
      >
        {isSpeechToTextEnabled ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </Tooltip>
  );
};

export { Microphone };