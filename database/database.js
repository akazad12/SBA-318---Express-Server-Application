export default {
  // Applicants
  applicants: [
    { id: 1, name: "Alice Smith", email: "alice@example.com" },
    { id: 2, name: "Bob Johnson", email: "bob@example.com" },
    { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
    { id: 4, name: "Dana White", email: "dana@example.com" },
    { id: 5, name: "Evan Brown", email: "evan@example.com" }
  ],

  // Jobs
  jobs: [
    { id: 1, company: "Google", role: "Software Engineer", location: "Remote" },
    { id: 2, company: "Amazon", role: "Backend Developer", location: "NYC" },
    { id: 3, company: "Stripe", role: "Full Stack Engineer", location: "Remote" },
    { id: 4, company: "Microsoft", role: "Frontend Developer", location: "Seattle" },
    { id: 5, company: "Meta", role: "React Developer", location: "Remote" },
    { id: 6, company: "Netflix", role: "Backend Engineer", location: "Los Angeles" },
    { id: 7, company: "Tesla", role: "Software Engineer", location: "Austin" },
    { id: 8, company: "Airbnb", role: "Full Stack Developer", location: "Remote" },
    { id: 9, company: "Uber", role: "Platform Engineer", location: "San Francisco" },
    { id: 10, company: "Shopify", role: "Backend Developer", location: "Remote" }
  ],

  // Applications (links applicants to jobs)
  applications: [
    { id: 1, applicantId: 1, jobId: 1 },
    { id: 2, applicantId: 2, jobId: 2 },
    { id: 3, applicantId: 3, jobId: 3 },
    { id: 4, applicantId: 4, jobId: 4 },
    { id: 5, applicantId: 5, jobId: 5 },
    { id: 6, applicantId: 1, jobId: 6 },
    { id: 7, applicantId: 2, jobId: 7 },
    { id: 8, applicantId: 3, jobId: 8 },
    { id: 9, applicantId: 4, jobId: 9 },
    { id: 10, applicantId: 5, jobId: 10 }
  ],

  // Responses (application status)
  responses: [
    { id:1, applicationId: 1, status: "interview", appliedDate: "2026-01-10" },
    { id:2, applicationId: 2, status: "applied", appliedDate: "2026-01-15" },
    { id:3, applicationId: 3, status: "rejected", appliedDate: "2026-01-05" },
    { id:4, applicationId: 4, status: "interview", appliedDate: "2026-01-18" },
    { id:5, applicationId: 5, status: "applied", appliedDate: "2026-01-20" },
    { id:6, applicationId: 6, status: "offer", appliedDate: "2026-01-25" },
    { id:7, applicationId: 7, status: "applied", appliedDate: "2026-01-28" },
    { id:8, applicationId: 8, status: "interview", appliedDate: "2026-02-01" },
    { id:9, applicationId: 9, status: "rejected", appliedDate: "2026-02-03" },
    { id:10,applicationId: 10, status: "applied", appliedDate: "2026-02-07" }
  ]
};
