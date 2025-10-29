import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Palette, Users, Award } from 'lucide-react';
import Footer from "@/components/Footer"; // import your custom Footer




const Index = () => {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  const navigate = useNavigate();

  const designPackages = [
    {
      id: "good-plus",
      name: "Good Plus",
      price: "Starting at Rs.29/sq.ft",
      features: [
        "Basic architectural design",
        "2D floor plans",
        "Standard material selection",
        "Email support"
      ],
      color: "bg-red-500"
    },
    {
      id: "better-plus",
      name: "Better Plus",
      price: "Starting at Rs.99/sq.ft",
      features: [
        "Enhanced architectural design",
        "3D renderings",
        "Premium material selection",
        "Priority support",
        "2 revisions"
      ],
      color: "bg-pink-500"
    },
    {
      id: "quad-plus",
      name: "Quad Plus",
      price: "Starting at Rs.129/sq.ft",
      features: [
        "Premium architectural design",
        "3D Interior & Exterior renderings",
        "Luxury material selection",
        "Dedicated architect",
        "Unlimited revisions",
        "Structural consultation"
      ],
      color: "bg-orange-500"
    },
    {
      id: "luxury-plus",
      name: "Luxury Plus",
      price: "Starting at Rs.149/sq.ft",
      features: [
        "Custom luxury design",
        "Full 3D/VR experience",
        "3D Interior & Exterior renderings",
        "Bespoke material sourcing",
        "Team of architects",
        "Unlimited revisions",
        "Full structural & MEP integration",
        "Project management"
      ],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 hover:bg-red-600">Quad Plus Architects</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
              Turn Your Dreams Into Design
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Transforming visions into architectural masterpieces with innovative design solutions tailored to your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                Explore Our Services
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive architectural solutions tailored to your unique needs and aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building, title: "Residential Design", description: "Custom homes designed for modern living" },
              { icon: Palette, title: "Interior Architecture", description: "Beautiful spaces that reflect your personality" },
              { icon: Users, title: "Commercial Projects", description: "Functional and inspiring work environments" },
              { icon: Award, title: "Renovation & Remodeling", description: "Transform existing spaces into dream areas" }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="text-red-500 w-8 h-8" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package that aligns with your vision and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designPackages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`border-2 transition-all duration-300 hover:scale-105 ${
                  hoveredPackage === pkg.id ? 'border-red-500 shadow-xl' : 'border-gray-200'
                }`}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`${pkg.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Palette className="text-white w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-gray-800 mt-2">
                    {pkg.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      pkg.id === "quad-plus" 
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600" 
                        : "bg-gray-800 hover:bg-gray-900"
                    }`}
                    onClick={() => navigate(`/contact?package=${pkg.name.replace(/\s+/g, "-")}`)}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Let our team of expert architects bring your vision to life with our premium design services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-500 hover:bg-gray-100 px-8 py-6 text-lg">
              Schedule a Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
 {/* Footer Section */}
     <Footer />
    </div>
  );
};

export default Index;