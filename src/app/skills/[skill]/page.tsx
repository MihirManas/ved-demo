import Link from "next/link";
import { ChevronRight, ExternalLink, Code2, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { skill: string } }): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.skill)} | Ved Upskilling`,
    description: `Learn more about ${decodeURIComponent(params.skill)} and its importance in modern tech architecture.`,
  };
}

async function getWikipediaData(skill: string) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(skill)}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

export default async function SkillPage({ params }: { params: { skill: string } }) {
  const skillName = decodeURIComponent(params.skill);
  
  const mappings: Record<string, string> = {
    'Node.js': 'Node.js',
    'React': 'React_(software)',
    'ReactJS': 'React_(software)',
    'MongoDB': 'MongoDB',
    'Python': 'Python_(programming_language)',
    'Django': 'Django_(web_framework)',
    'REST APIs': 'REST',
    'API': 'API',
    'Express': 'Express.js',
    'HTML5': 'HTML5',
    'CSS3': 'CSS',
    'JavaScript': 'JavaScript',
    'Java': 'Java_(programming_language)',
    'Spring': 'Spring_Framework',
    'Spring Boot': 'Spring_Boot',
    'PostgreSQL': 'PostgreSQL',
    'MySQL': 'MySQL',
    'SQL': 'SQL',
    'NoSQL': 'NoSQL',
    'AWS': 'Amazon_Web_Services',
    'Azure': 'Microsoft_Azure',
    'Kubernetes': 'Kubernetes',
    'Docker': 'Docker_(software)',
    'Pandas': 'Pandas_(software)',
    'NumPy': 'NumPy',
    'TensorFlow': 'TensorFlow',
    'PyTorch': 'PyTorch',
    'Scikit-Learn': 'Scikit-learn',
    'Tableau': 'Tableau_Software',
    'PowerBI': 'Microsoft_Power_BI',
    'ROS': 'Robot_Operating_System',
    'IoT': 'Internet_of_things',
    'MQTT': 'MQTT',
    'Verilog': 'Verilog',
    'SystemVerilog': 'SystemVerilog',
    'ASIC': 'Application-specific_integrated_circuit',
    'FPGA': 'Field-programmable_gate_array',
    'C/C++': 'C++',
    'Kali Linux': 'Kali_Linux',
    'Cryptography': 'Cryptography',
    'Solidity': 'Solidity',
    'Ethereum': 'Ethereum',
    'Web3.js': 'Web3.js',
    'Next.js': 'Next.js',
    'Redux': 'Redux_(JavaScript_library)',
    'Mongoose': 'Mongoose_(Node.js)'
  };
  
  const matchKey = Object.keys(mappings).find(key => key.toLowerCase() === skillName.toLowerCase());
  const searchName = matchKey ? mappings[matchKey] : skillName;
  
  let wikiData = await getWikipediaData(searchName);

  return (
    <div className="min-h-screen pt-32 pb-40 animate-in fade-in duration-1000 ease-out">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/domains"
          className="inline-flex items-center text-gray-500 dark:text-white/50 hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors mb-16 uppercase tracking-[0.2em] text-sm font-bold group"
        >
          <ChevronRight size={18} className="rotate-180 mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Domains Catalog
        </Link>

        <ScrollReveal>
          <div className="mb-20">
            <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-[#1F3145]/[0.03] dark:bg-white/[0.03] border border-[#1F3145]/10 dark:border-white/[0.08] mb-8 backdrop-blur-md">
              <Code2 className="text-[#E6C875] w-4 h-4" />
              <span className="text-xs font-bold text-gray-700 dark:text-white/80 uppercase tracking-[0.2em]">Technology Skill</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-gray-900 dark:text-white mb-8 leading-[1.05]">
              {wikiData?.title || skillName}
            </h1>
            
            {wikiData?.description && (
              <p className="text-xl text-[#B8860B] dark:text-[#E6C875]/80 font-medium uppercase tracking-widest mb-12">
                {wikiData.description}
              </p>
            )}

            <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.05] rounded-[3rem] p-10 md:p-16 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6C875]/5 rounded-full blur-[80px] -z-10"></div>
              
              <div className="flex items-center mb-10 text-gray-400 dark:text-white/30">
                <BookOpen size={24} className="mr-4" />
                <span className="text-sm font-bold uppercase tracking-[0.2em]">Overview</span>
              </div>

              {wikiData && wikiData.type !== 'disambiguation' && wikiData.extract_html ? (
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-white/70 font-light leading-loose"
                  dangerouslySetInnerHTML={{ __html: wikiData.extract_html }}
                />
              ) : (
                <div className="text-gray-600 dark:text-white/60 font-light text-xl leading-relaxed">
                  <p>
                    {skillName} is a highly demanded skill in modern industry architecture. 
                    Detailed encyclopedic information about this technology is currently being curated by our technical team.
                  </p>
                  <p className="mt-6">
                    Mastering {skillName} is a core part of the execution protocol in our specialized domains.
                  </p>
                </div>
              )}

              {wikiData?.content_urls?.desktop?.page && (
                <div className="mt-16 pt-10 border-t border-gray-200 dark:border-white/10">
                  <a 
                    href={wikiData.content_urls.desktop.page} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-[#1F3145] dark:text-white hover:text-[#E6C875] dark:hover:text-[#E6C875] transition-colors"
                  >
                    Read full article on Wikipedia <ExternalLink size={16} className="ml-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
