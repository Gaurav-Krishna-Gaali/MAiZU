"use client"

import { ArrowRight, Cloud, Database, Server, Cpu, Globe } from "lucide-react"

const services = [
  {
    name: "Amazon S3",
    role: "Waveform Storage",
    icon: Database,
    status: "active" as const,
    detail: "Raw ingestion + processed results",
  },
  {
    name: "AWS Lambda",
    role: "Orchestration",
    icon: Server,
    status: "active" as const,
    detail: "Normalization + API logic",
  },
  {
    name: "Amazon Bedrock",
    role: "AI / LLM Engine",
    icon: Cpu,
    status: "active" as const,
    detail: "Claude 3.5 Sonnet / Nova Pro",
  },
  {
    name: "DynamoDB",
    role: "Results Store",
    icon: Database,
    status: "active" as const,
    detail: "Diagnostic snapshots + logs",
  },
  {
    name: "API Gateway",
    role: "API Layer",
    icon: Globe,
    status: "active" as const,
    detail: "REST endpoint delivery",
  },
  {
    name: "Fargate",
    role: "Dashboard Host",
    icon: Cloud,
    status: "active" as const,
    detail: "Demo UI container",
  },
]

export function InfrastructureMap() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-5 text-sm font-semibold text-card-foreground">
        AWS Infrastructure
      </h3>

      <div className="flex flex-col gap-3">
        {services.map((service, i) => (
          <div key={service.name}>
            <div className="flex items-center gap-4 rounded-lg bg-secondary/50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-card-foreground">{service.name}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {service.role}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{service.detail}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-[10px] text-success">Active</span>
              </div>
            </div>
            {i < services.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowRight className="h-3 w-3 rotate-90 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
