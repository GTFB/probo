'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { ArrowRight, Star, Users, Zap } from "lucide-react"

export function HeroSection() {
  const t = useTranslations()

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">
              <Star className="w-3 h-3 mr-1" />
              {t('hero.badge')}
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              {t('hero.primaryButton')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              {t('hero.secondaryButton')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">{t('hero.stats.users')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">{t('hero.stats.uptime')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">{t('hero.stats.support')}</div>
            </div>
          </div>
        </div>

        {/* Right Column - Feature Cards */}
        <div className="space-y-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t('hero.features.performance.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.performance.description')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t('hero.features.collaboration.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.collaboration.description')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t('hero.features.quality.title')}</CardTitle>
              <CardDescription>
                {t('hero.features.quality.description')}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
