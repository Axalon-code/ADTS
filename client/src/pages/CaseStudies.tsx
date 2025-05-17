import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Helmet } from 'react-helmet';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>Case Studies - ADTS</title>
        <meta name="description" content="Browse our successful IT consultancy projects and case studies showcasing our expertise in Microsoft 365, Azure, and Identity Management solutions." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Success Stories</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Case studies of our work will be published here soon. Please check back later.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => window.history.back()}
            className="bg-primary text-white hover:bg-accent transition-colors"
          >
            Go Back
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}