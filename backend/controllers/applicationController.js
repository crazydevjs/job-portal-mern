const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existing = await Application.findOne({
      candidate: req.user.id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application = await Application.create({
      candidate: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job")
      .populate("candidate", "name email");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate("candidate", "name email")
      .populate("job");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application =
      await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
      );

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
};