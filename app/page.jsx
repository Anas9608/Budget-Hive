"use client";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { featuresData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return <div className="mt-40">
    <HeroSection />
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => {
            return (<div key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2"> {stat.value} </div>
              <div className="text-gray-600"> {stat.label} </div>
            </div>);
          })}
        </div>
      </div>
    </section>

    {/*features section*/}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Everything you need to manage your finance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, idx) => {
            return (
              <Card key={idx} className="p-6">
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>);
          })}
        </div>
      </div>
    </section>
    {/*Testimonials section*/}
    <section>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-2">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, idx) => {
            return (
              <Card key={idx} className="p-6">
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <Image src={testimonial.image}
                      alt={testimonial.name}
                      width={40} height={40} className="rounded-full" />
                    <div className="ml-4">
                      <div className="font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.quote}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>);
          })}
        </div>
      </div>
    </section>
    <section className="py-20 bg-blue-500">
      <div className="container text-center mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">  Ready to Take Control of Your Finances?</h2>
        <div className="text-blue-200 mb-8 max-w-2xl mx-auto">
          <p className="mb-4">
            Join thousands of users who are already managing their finances
            smarter with Budget Hive
          </p>
          <Link href='/dashboard'>
            <Button size='lg' className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce">
              start free trail
            </Button>
          </Link>
        </div>
      </div>
    </section>

  </div>;
}
