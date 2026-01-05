import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { terminologyData, getAllTerms } from '@/data/terminology';
import TerminologyTooltip from '@/components/TerminologyTooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const allTerms = getAllTerms();
  
  const categories = [
    { id: "all", name: "All Terms" },
    { id: "azure", name: "Azure" },
    { id: "identity", name: "Identity" },
    { id: "m365", name: "Microsoft 365" },
    { id: "automation", name: "Automation" },
    { id: "general", name: "General IT" },
    { id: "networking", name: "Networking" },
    { id: "security", name: "Security" },
    { id: "hardware", name: "Hardware" },
    { id: "backup", name: "Backup & DR" },
  ];
  
  const filteredTerms = allTerms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    term.explanation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Helmet>
        <title>IT Glossary | ADTS - Tailoring Your IT Requirements</title>
        <meta name="description" content="A comprehensive glossary of IT terminology related to Microsoft Azure, Identity Management, Microsoft 365, and IT Automation." />
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen pt-8 pb-16">
        <div className="px-4 sm:px-6 md:px-8 lg:container lg:mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-2 text-center text-white">IT Terminology Glossary</h1>
            <p className="text-center text-gray-700 dark:text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">
              A comprehensive guide to technical terms used in IT consultancy, with easy-to-understand explanations.
            </p>
            
            <div className="mb-6 sm:mb-8">
              <Input
                type="text"
                placeholder="Search for terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex flex-wrap gap-2 h-auto p-2 mb-6 justify-center">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id} 
                    className="text-sm sm:text-base px-3 py-2 whitespace-nowrap text-black dark:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTerms
                      .filter(term => category.id === "all" || term.category === category.id)
                      .sort((a, b) => a.term.localeCompare(b.term))
                      .map((term, index) => (
                        <div 
                          key={index} 
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-white/20"
                        >
                          <h3 className="text-lg font-semibold text-[#0066FF] mb-2">
                            <TerminologyTooltip term={term.term} explanation={term.explanation}>
                              {term.term}
                            </TerminologyTooltip>
                          </h3>
                          <p className="text-[18px] text-white/90">{term.explanation}</p>
                        </div>
                      ))}
                  </div>
                  
                  {filteredTerms.filter(term => category.id === "all" || term.category === category.id).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-white/70">
                        {searchTerm ? "No matching terms found." : "No terms in this category."}
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}