import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Palette, Home, Building2, RefreshCw, Users, FileText, Calendar } from 'lucide-react';

const Services = () => {
  const [activePackage, setActivePackage] = useState("quad-plus");

  const packages = [
    {
      id: "good-plus",
      name: "Good Plus",
      tagline: "Perfect for starter homes",
      price: "Rs29 - Rs.69/sq.ft",
      color: "bg-red-500",
      features: [
        "Basic architectural design",
        "2D floor plans",
        "Standard material selection",
        "Email support",
        "1 revision round"
      ],
      timeline: "1-2 weeks"
    },
    {
      id: "better-plus",
      name: "Better Plus",
      tagline: "Enhanced design experience",
      price: "Rs.99 - Rs.129/sq.ft",
      color: "bg-pink-500",
      features: [
        "Enhanced architectural design",
        "3D Interior & Exterior renderings",
        "Premium material selection",
        "Priority support",
        "2 revision rounds",
        "Basic structural consultation"
      ],
      timeline: "2-4 weeks"
    },
    {
      id: "quad-plus",
      name: "Quad Plus",
      tagline: "Our most popular package",
      price: "Rs.129 - Rs.149/Sq.ft",
      color: "bg-orange-500",
      features: [
        "Premium architectural design",
        "Full 3D/VR experience",
        "3D Interior & Exterior renderings",
        "Luxury material selection",
        "Dedicated architect",
        "Unlimited revisions",
        "Full structural consultation",
        "MEP integration",
        "Project Management"
      ],
      timeline: "3-6 weeks"
    },
    {
      id: "luxury-plus",
      name: "Luxury Plus",
      tagline: "The ultimate design experience",
      price: "Rs.129+",
      color: "bg-purple-500",
      features: [
        "Custom luxury design",
        "Full 3D/4D/VR experience",
        "Bespoke material sourcing",
        "Team of architects",
        "Unlimited revisions",
        "Full structural & MEP integration",
        "Project management",
        "Construction supervision",
        "Smart home integration"
      ],
      timeline: "6-8 weeks"
    }
  ];

  const processSteps = [
    {
      icon: FileText,
      title: "Initial Consultation",
      description: "We discuss your vision, requirements, and budget to create a tailored plan."
    },
    {
      icon: Palette,
      title: "Concept Design",
      description: "Our architects develop initial concepts and present them for your feedback."
    },
    {
      icon: Home,
      title: "Design Development",
      description: "We refine the design based on your input and create detailed plans."
    },
    {
      icon: Building2,
      title: "Finalization",
      description: "Final designs are prepared with all necessary documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 hover:bg-red-600">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Architectural Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              From initial concept to final construction, we provide end-to-end architectural services 
              tailored to transform your dreams into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure your project is executed flawlessly from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200"></div>
                )}
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="text-red-500 w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted packages designed to meet various project needs and budgets.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {packages.map((pkg) => (
              <Button
                key={pkg.id}
                variant={activePackage === pkg.id ? "default" : "outline"}
                className={`px-6 py-3 ${
                  activePackage === pkg.id 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "border-2 border-gray-300"
                }`}
                onClick={() => setActivePackage(pkg.id)}
              >
                {pkg.name}
              </Button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            {packages
              .filter(pkg => pkg.id === activePackage)
              .map((pkg) => (
                <Card key={pkg.id} className="border-0 shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <div className={`${pkg.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Palette className="text-white w-10 h-10" />
                    </div>
                    <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {pkg.tagline}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-800">{pkg.price}</span>
                      <span className="text-gray-600 ml-2">({pkg.timeline})</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
  size="lg"
  className="bg-red-500 hover:bg-red-600 text-white flex-1 py-6"
  onClick={() => {
    // Navigate to contact page with package query param
    window.location.href = `/contact?package=${pkg.name.replace(/\s+/g, "-")}`;
  }}
>
  Select This Package
</Button>
                      <Button size="lg" variant="outline" className="border-2 border-gray-300 flex-1 py-6">
                        Request Custom Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure Which Package is Right for You?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Schedule a free consultation with our design experts to discuss your project needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-500 hover:bg-gray-100 px-8 py-6 text-lg">
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;