'use client';

import { Card } from '@/components/ui/Card';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Lightbulb, Brain, Zap, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Rub the Lamp',
    description: 'Visit BetGenie and get instant access to daily AI predictions',
    icon: Lightbulb,
    color: 'text-primary-gold',
  },
  {
    number: 2,
    title: 'Receive AI Insights',
    description: 'Get probability scores, reasoning, and expert analysis for each tip',
    icon: Brain,
    color: 'text-primary-cyan',
  },
  {
    number: 3,
    title: 'Build Accumulators',
    description: 'Combine multiple picks with our smart accumulator builder',
    icon: Zap,
    color: 'text-status-success',
  },
  {
    number: 4,
    title: 'Track & Win',
    description: 'Monitor your bets in real-time and watch your profits grow',
    icon: TrendingUp,
    color: 'text-primary-blue',
  },
];

export default function HowItWorks() {
  return (
    <>
      <SectionDivider />
      <section className="w-full bg-gradient-to-b from-primary-navy-dark via-primary-navy to-primary-navy-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-white mb-4">How It Works</h2>
            <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
              Four simple steps to start winning consistently
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-12 w-6 h-0.5 bg-gradient-to-r from-primary-blue to-transparent"></div>
                  )}

                  <Card className="h-full flex flex-col items-start gap-4 hover:border-primary-cyan/50 hover:shadow-glow-lg transition-all duration-300">
                    {/* Step number circle */}
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-gold/20 to-primary-blue/20 border border-primary-blue/50 group-hover:shadow-glow-md transition-all">
                        <span className="font-bold text-primary-gold">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <Icon className={`${step.color} h-8 w-8`} />

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-neutral-white mb-2">{step.title}</h3>
                      <p className="text-neutral-text-secondary text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
