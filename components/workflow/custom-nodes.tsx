"use client";

import { Handle, Position, NodeProps } from "@xyflow/react";
import { Zap, Shield, GitBranch, Send } from "lucide-react";

const nodeStyles = "glass-card p-4 rounded-lg shadow-lg min-w-[200px] transition-transform hover:scale-105";

export function TriggerNode({ data, selected }: NodeProps) {
  return (
    <div className={`${nodeStyles} border-2 ${selected ? "border-primary" : "border-gray-200"}`}>
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        <div>
          <div className="font-semibold">{(data as any).label || "Trigger"}</div>
          <div className="text-xs text-gray-500">Start workflow</div>
        </div>
      </div>
    </div>
  );
}

export function NiraVerifyNode({ data, selected }: NodeProps) {
  return (
    <div className={`${nodeStyles} border-2 ${selected ? "border-primary" : "border-gray-200"}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-success" />
        <div>
          <div className="font-semibold">{(data as any).label || "NIRA Verify"}</div>
          <div className="text-xs text-gray-500">Verify identity</div>
        </div>
      </div>
    </div>
  );
}

export function IfThenNode({ data, selected }: NodeProps) {
  return (
    <div className={`${nodeStyles} border-2 ${selected ? "border-primary" : "border-gray-200"}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: "33%" }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: "66%" }} />
      <div className="flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-accent" />
        <div>
          <div className="font-semibold">{(data as any).label || "If/Then"}</div>
          <div className="text-xs text-gray-500">Conditional logic</div>
        </div>
      </div>
    </div>
  );
}

export function SendWebhookNode({ data, selected }: NodeProps) {
  return (
    <div className={`${nodeStyles} border-2 ${selected ? "border-primary" : "border-gray-200"}`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Send className="w-5 h-5 text-primary" />
        <div>
          <div className="font-semibold">{(data as any).label || "Send Webhook"}</div>
          <div className="text-xs text-gray-500">Send data</div>
        </div>
      </div>
    </div>
  );
}

export const nodeTypes = {
  trigger: TriggerNode,
  niraVerify: NiraVerifyNode,
  ifThen: IfThenNode,
  sendWebhook: SendWebhookNode,
};
