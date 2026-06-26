import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-[#0c0a07] bg-[#c8913a] border-[#c8913a]";
      case "in-progress": return "text-[#0c0a07] bg-[#e8c875] border-[#e8c875]";
      case "pending": return "text-[#8a857e] bg-[#161310] border-[#3a3530]";
      default: return "text-[#8a857e] bg-[#161310] border-[#3a3530]";
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden"
      style={{ height: '520px', background: 'transparent' }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: '1000px' }}
        >
          {/* Center orb */}
          <div className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
               style={{ background: 'radial-gradient(circle, rgba(200,145,58,0.3), rgba(200,145,58,0.05))' }}>
            <div className="absolute w-18 h-18 rounded-full animate-ping opacity-30"
                 style={{ width: 72, height: 72, border: '1px solid rgba(200,145,58,0.2)' }} />
            <div className="absolute rounded-full animate-ping opacity-15"
                 style={{ width: 88, height: 88, border: '1px solid rgba(200,145,58,0.1)', animationDelay: '0.5s' }} />
            <div className="w-7 h-7 rounded-full" style={{ background: 'rgba(200,145,58,0.6)', backdropFilter: 'blur(8px)' }} />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full" style={{ width: 360, height: 360, border: '1px solid rgba(200,145,58,0.08)' }} />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy glow */}
                <div
                  className={isPulsing ? 'animate-pulse' : ''}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(200,145,58,0.15) 0%, transparent 70%)',
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `${-(item.energy * 0.4 + 36 - 36) / 2}px`,
                    top: `${-(item.energy * 0.4 + 36 - 36) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isExpanded ? '#c8913a' : isRelated ? 'rgba(200,145,58,0.3)' : '#161310',
                    color: isExpanded ? '#0c0a07' : isRelated ? '#c8913a' : '#8a857e',
                    border: `2px solid ${isExpanded ? '#c8913a' : isRelated ? '#c8913a' : 'rgba(200,145,58,0.15)'}`,
                    boxShadow: isExpanded ? '0 0 20px rgba(200,145,58,0.3)' : 'none',
                    transform: isExpanded ? 'scale(1.4)' : 'scale(1)',
                  }}
                >
                  <Icon size={14} />
                </div>

                {/* Label */}
                <div
                  className="absolute top-11 whitespace-nowrap text-[11px] font-semibold tracking-wider transition-all duration-300"
                  style={{
                    color: isExpanded ? '#f2f0ed' : 'rgba(242,240,237,0.5)',
                    transform: isExpanded ? 'scale(1.15)' : 'scale(1)',
                    left: '50%',
                    translateX: '-50%',
                  }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-18 left-1/2 -translate-x-1/2 w-64 overflow-visible rounded-2xl"
                    style={{
                      background: 'rgba(19,17,16,0.95)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(200,145,58,0.15)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,145,58,0.05)',
                      top: '4.5rem',
                    }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3"
                         style={{ background: 'rgba(200,145,58,0.3)' }} />
                    <CardHeader className="pb-2 p-5">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-[10px] rounded-md ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="text-[11px] font-mono" style={{ color: '#5a5650' }}>{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2" style={{ color: '#f2f0ed', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs p-5 pt-0" style={{ color: '#8a857e' }}>
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(200,145,58,0.08)' }}>
                        <div className="flex justify-between items-center text-[11px] mb-1.5">
                          <span className="flex items-center gap-1">
                            <Zap size={10} style={{ color: '#c8913a' }} />
                            <span style={{ color: '#6a6560' }}>Energy Level</span>
                          </span>
                          <span className="font-mono" style={{ color: '#c8913a' }}>{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(200,145,58,0.08)' }}>
                          <div className="h-full rounded-full"
                               style={{ width: `${item.energy}%`, background: 'linear-gradient(to right, #c8913a, #e8c875)' }} />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(200,145,58,0.08)' }}>
                          <div className="flex items-center mb-2 gap-1">
                            <LinkIcon size={10} style={{ color: '#5a5650' }} />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium" style={{ color: '#5a5650' }}>
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button key={relatedId} variant="outline" size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-[11px] rounded-lg transition-all cursor-pointer"
                                  style={{
                                    border: '1px solid rgba(200,145,58,0.12)',
                                    background: 'transparent',
                                    color: '#8a857e',
                                  }}
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1" style={{ color: '#c8913a' }} />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
