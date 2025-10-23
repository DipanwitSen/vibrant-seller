import { useState } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { VoiceAssistant } from "@/utils/VoiceAssistant";
import { useToast } from "./ui/use-toast";
import { Card } from "./ui/card";

const VoiceAssistantButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const { toast } = useToast();
  const projectId = "rxoympfoabnffyphsbnz";
  
  let assistant: VoiceAssistant | null = null;

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      assistant = new VoiceAssistant(projectId, (text, isFinal) => {
        if (isFinal) {
          setTranscript(prev => [...prev, text]);
        }
      });
      
      await assistant.connect();
      setIsConnected(true);
      toast({
        title: "Voice Assistant Connected",
        description: "You can now speak to ask questions about KYC, GSTIN, and seller operations.",
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Could not connect to voice assistant",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (assistant) {
      assistant.disconnect();
      assistant = null;
    }
    setIsConnected(false);
    setTranscript([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {transcript.length > 0 && (
        <Card className="max-w-md p-4 max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-2">Conversation</h3>
          <div className="space-y-2 text-sm">
            {transcript.map((text, i) => (
              <p key={i} className="text-muted-foreground">{text}</p>
            ))}
          </div>
        </Card>
      )}
      
      <Button
        size="lg"
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className="rounded-full w-16 h-16 shadow-lg"
        variant={isConnected ? "destructive" : "default"}
      >
        {isConnecting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isConnected ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default VoiceAssistantButton;