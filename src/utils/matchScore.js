/**
 * Calculates a match score between a freelancer and a project based on various criteria
 * Returns a score between 0 and 100
 */

const calculateSkillMatch = (freelancerSkills, projectRequirements) => {
  if (!projectRequirements.length) return 100;
  const matchedSkills = projectRequirements.filter(skill =>
    freelancerSkills.includes(skill)
  );
  return (matchedSkills.length / projectRequirements.length) * 100;
};

const calculateExperienceMatch = (freelancerExperience, projectComplexity) => {
  // Project complexity: 1 (Entry) to 5 (Expert)
  const experienceLevels = {
    entry: 1,
    intermediate: 3,
    expert: 5
  };

  const freelancerLevel = experienceLevels[freelancerExperience] || 1;
  const diff = Math.abs(freelancerLevel - projectComplexity);
  return Math.max(0, 100 - (diff * 20));
};

const calculateBudgetMatch = (freelancerRate, projectBudget, projectDuration) => {
  const totalCost = freelancerRate * projectDuration;
  const budgetDiff = Math.abs(totalCost - projectBudget);
  const percentDiff = (budgetDiff / projectBudget) * 100;
  return Math.max(0, 100 - percentDiff);
};

const calculateAvailabilityMatch = (freelancerAvailability, projectTimeline) => {
  if (freelancerAvailability >= projectTimeline) return 100;
  return (freelancerAvailability / projectTimeline) * 100;
};

export const calculateMatchScore = (freelancer, project) => {
  const weights = {
    skills: 0.4,
    experience: 0.25,
    budget: 0.2,
    availability: 0.15
  };

  const skillScore = calculateSkillMatch(freelancer.skills, project.requiredSkills);
  const experienceScore = calculateExperienceMatch(freelancer.experienceLevel, project.complexity);
  const budgetScore = calculateBudgetMatch(freelancer.hourlyRate, project.budget, project.duration);
  const availabilityScore = calculateAvailabilityMatch(freelancer.availableHours, project.requiredHours);

  const totalScore =
    skillScore * weights.skills +
    experienceScore * weights.experience +
    budgetScore * weights.budget +
    availabilityScore * weights.availability;

  return Math.round(totalScore);
};

export const getMatchCategory = (score) => {
  if (score >= 90) return 'Perfect Match';
  if (score >= 75) return 'Strong Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Fair Match';
  return 'Low Match';
};

export const getRecommendedFreelancers = (project, freelancers, minScore = 60) => {
  return freelancers
    .map(freelancer => ({
      ...freelancer,
      matchScore: calculateMatchScore(freelancer, project)
    }))
    .filter(freelancer => freelancer.matchScore >= minScore)
    .sort((a, b) => b.matchScore - a.matchScore);
};