import { db } from '../server/db.js';
import { blogPosts } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

const blogPostsData = [
  {
    title: "Securing Microsoft 365 with Conditional Access Policies",
    slug: "securing-microsoft-365-conditional-access",
    excerpt: "Learn how to implement effective conditional access policies in Microsoft 365 to protect your organization's data and resources.",
    content: `
      <h2>Why Conditional Access Matters</h2>
      <p>Conditional Access policies are a crucial component of a modern security strategy. They help organizations balance security with productivity by providing the right access to users depending on their context.</p>
      
      <h2>Getting Started</h2>
      <p>Before implementing Conditional Access policies, it's important to understand your organization's security needs and risk profile. Start with these steps:</p>
      <ul>
        <li>Identify your critical applications and resources</li>
        <li>Determine which users and groups need access to these resources</li>
        <li>Define the conditions under which access should be granted or denied</li>
        <li>Plan your control measures (e.g., MFA, compliant devices)</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Consider these best practices when implementing Conditional Access:</p>
      <ul>
        <li>Start with a "report-only" mode to understand the impact of your policies</li>
        <li>Implement a staged approach, starting with high-risk applications</li>
        <li>Always include break-glass accounts in your exclusion groups</li>
        <li>Test thoroughly before enforcing policies</li>
        <li>Monitor the impact of your policies on users and adjust as needed</li>
      </ul>
      
      <h2>Common Scenarios</h2>
      <p>Here are some common Conditional Access scenarios:</p>
      <ol>
        <li><strong>Require MFA for all users accessing cloud apps</strong> - This is a baseline policy that should be implemented in all organizations.</li>
        <li><strong>Block access from untrusted locations</strong> - Prevent access from high-risk countries or regions.</li>
        <li><strong>Require compliant devices</strong> - Ensure that only devices meeting your security requirements can access sensitive data.</li>
        <li><strong>Restrict access based on risk</strong> - Use Azure AD Identity Protection risk signals to adapt your access requirements.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Conditional Access is a powerful tool in your security arsenal. By carefully planning and implementing your policies, you can significantly reduce your organization's risk profile while maintaining productivity.</p>
    `,
    category: "Security",
    tags: ["Microsoft 365", "Conditional Access", "MFA", "Identity Protection"],
    publishedAt: new Date(2023, 10, 15).toISOString(),
    featured: true,
    author: "Alex",
    imageUrl: "/blog-images/conditional-access.svg"
  },
  {
    title: "Optimizing Azure Costs: 5 Tips to Reduce Your Cloud Spend",
    slug: "optimizing-azure-costs",
    excerpt: "Discover practical strategies to optimize your Azure cloud spending without compromising performance or security.",
    content: `
      <h2>Introduction</h2>
      <p>As organizations increasingly rely on cloud services, managing costs has become a critical aspect of cloud governance. Azure offers several tools and features to help you optimize your cloud spending, but it requires a strategic approach.</p>
      
      <h2>1. Right-size Your Resources</h2>
      <p>One of the most effective ways to reduce costs is to ensure your resources are appropriately sized for your workloads. Azure Advisor and Azure Cost Management provide recommendations for right-sizing:</p>
      <ul>
        <li>Identify and resize or shut down underutilized VMs</li>
        <li>Use Azure Monitor to track resource utilization patterns</li>
        <li>Implement auto-scaling to match capacity with demand</li>
      </ul>
      
      <h2>2. Leverage Reserved Instances</h2>
      <p>For predictable workloads, Azure Reserved Instances (RIs) can offer significant savings:</p>
      <ul>
        <li>Up to 72% savings compared to pay-as-you-go pricing</li>
        <li>1-year or 3-year commitment options</li>
        <li>Can be applied at the subscription or management group level</li>
      </ul>
      
      <h2>3. Implement Resource Tagging</h2>
      <p>Proper tagging enables better cost allocation and identification of optimization opportunities:</p>
      <ul>
        <li>Tag resources by department, project, environment, etc.</li>
        <li>Create tag-based policies using Azure Policy</li>
        <li>Generate cost reports filtered by tags</li>
      </ul>
      
      <h2>4. Utilize Azure Hybrid Benefit</h2>
      <p>If you have existing Windows Server or SQL Server licenses, Azure Hybrid Benefit can help you save:</p>
      <ul>
        <li>Use your on-premises licenses in Azure</li>
        <li>Save up to 40% on Windows VMs and 55% on SQL Server</li>
        <li>Combine with Reserved Instances for even greater savings</li>
      </ul>
      
      <h2>5. Implement Governance Controls</h2>
      <p>Establish governance controls to prevent unexpected costs:</p>
      <ul>
        <li>Set up budgets and alerts in Azure Cost Management</li>
        <li>Use Azure Policy to enforce cost-conscious resource configurations</li>
        <li>Implement Azure Blueprints for standardized, cost-optimized environments</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Cost optimization in Azure is an ongoing process that requires continuous monitoring and adjustment. By implementing these strategies, you can achieve significant savings while maintaining the performance and security your organization needs.</p>
    `,
    category: "Cloud Management",
    tags: ["Azure", "Cost Optimization", "Cloud Governance", "Reserved Instances"],
    publishedAt: new Date(2023, 11, 5).toISOString(),
    featured: true,
    author: "Alex",
    imageUrl: "/blog-images/azure-cost.svg"
  },
  {
    title: "Essential Microsoft Intune Configurations for Secure Device Management",
    slug: "essential-intune-configurations",
    excerpt: "A comprehensive guide to configuring Microsoft Intune for effective and secure device management in your organization.",
    content: `
      <h2>Getting Started with Intune</h2>
      <p>Microsoft Intune provides comprehensive device management capabilities for your organization. Setting up Intune correctly is crucial for maintaining a secure and productive environment.</p>
      
      <h2>1. Compliance Policies</h2>
      <p>Compliance policies ensure that devices meet specific security requirements before accessing corporate resources:</p>
      <ul>
        <li>Require encryption on all devices</li>
        <li>Ensure devices have up-to-date security patches</li>
        <li>Define minimum OS versions</li>
        <li>Require screen locks with appropriate timeout settings</li>
      </ul>
      
      <h2>2. Configuration Profiles</h2>
      <p>Configuration profiles allow you to manage settings and features on user devices:</p>
      <ul>
        <li>Deploy email, Wi-Fi, and VPN profiles</li>
        <li>Configure security features like BitLocker</li>
        <li>Manage device restrictions</li>
        <li>Set up endpoint protection settings</li>
      </ul>
      
      <h2>3. App Protection Policies</h2>
      <p>App protection policies help secure corporate data at the application level:</p>
      <ul>
        <li>Prevent cut, copy, and paste operations between work and personal apps</li>
        <li>Require PIN access for corporate applications</li>
        <li>Encrypt app data</li>
        <li>Control where data can be saved from corporate apps</li>
      </ul>
      
      <h2>4. Conditional Access Integration</h2>
      <p>Integrating Intune with Conditional Access enhances your security posture:</p>
      <ul>
        <li>Require compliant devices for accessing corporate resources</li>
        <li>Block access from unmanaged devices</li>
        <li>Implement risk-based access controls</li>
      </ul>
      
      <h2>5. Update Management</h2>
      <p>Managing updates is critical for security and functionality:</p>
      <ul>
        <li>Create update rings for staged deployments</li>
        <li>Set maintenance windows to minimize disruption</li>
        <li>Monitor update compliance</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Proper configuration of Microsoft Intune is essential for maintaining a secure and productive environment. By implementing these key configurations, you can ensure that your devices are secure, compliant, and effectively managed.</p>
    `,
    category: "Device Management",
    tags: ["Microsoft Intune", "MDM", "Compliance", "Device Security"],
    publishedAt: new Date(2023, 9, 20).toISOString(),
    featured: false,
    author: "Alex",
    imageUrl: "/blog-images/intune-management.svg"
  }
];

async function main() {
  try {
    console.log('Starting blog posts seeding...');
    
    // Insert blog posts
    for (const post of blogPostsData) {
      // Check if the post already exists
      const existing = await db.select({ id: blogPosts.id })
        .from(blogPosts)
        .where(eq(blogPosts.slug, post.slug));
        
      if (existing.length === 0) {
        const result = await db.insert(blogPosts).values(post).returning();
        console.log(`Created blog post: ${result[0].title}`);
      } else {
        console.log(`Blog post with slug "${post.slug}" already exists. Skipping.`);
      }
    }
    
    console.log('Blog posts seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
}

main();