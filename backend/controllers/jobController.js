const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      recruiter: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name email");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};