const password = 'Ved-HR-Password-2026!';

async function test() {
  try {
    // 1. Fetch jobs
    const jobsRes = await fetch(`http://localhost:3000/api/jobs?password=${encodeURIComponent(password)}`);
    const jobsData = await jobsRes.json();
    console.log("Jobs:", jobsData.jobs?.length);
    
    if (jobsData.jobs && jobsData.jobs.length > 0) {
      const job = jobsData.jobs[0];
      console.log("Testing Archive on Job:", job.id);
      
      const archiveRes = await fetch(`http://localhost:3000/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, isActive: !job.isActive })
      });
      const archiveData = await archiveRes.json();
      console.log("Archive status:", archiveRes.status, archiveData);
    }
  } catch (err) {
    console.error("Test error:", err);
  }
}

test();
