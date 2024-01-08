import CampaignPipelinesBuilder from './PipelineBuilder.js'

class Campaign {
  constructor({
    campaignId,
    courseIds,
    quizIds,
    groupIds,
    type,
    pipeline,
    errorPipeline,
    failurePipeline,
  }) {
    this.campaignId = campaignId
    this.courseIds = courseIds
    this.quizIds = quizIds
    this.groupIds = groupIds
    this.type = type
    this.pipeline = pipeline.map(p => p.bind(this))
    this.errorPipeline = errorPipeline.map(p => p.bind(this))
    this.failurePipeline = failurePipeline.map(p => p.bind(this))
  }

  async execPipeline() {
    return this.exec(this.pipeline).catch(err => {
      console.error('Error: exec Campaign Pipeline...', err)
      this.execErrorPipeline()
    })
  }

  async execErrorPipeline() {
    return this.exec(this.errorPipeline).catch(err => {
      console.error('Error: exec Campaign Error Pipeline...', err)
      this.execFailurePipeline()
    })
  }

  async execFailurePipeline() {
    return this.exec(this.failurePipeline).catch(err =>
      console.error('Error: exec Campaign Failure Cleanup Pipeline...', err),
    )
  }

  async exec(pipeline) {
    for await (const fn of pipeline) await fn.bind(this)
  }
}

class ExecuteCampaign {
  onCourseIds(courseIds) {
    this.courseIds = courseIds
    this.type = 'course'

    const pipelines = new CampaignPipelinesBuilder().forCourse().build()
    this.setPipelines(pipelines)

    return this
  }

  onQuizIds(quizIds) {
    this.quizIds = quizIds
    this.type = 'quiz'

    const pipelines = new CampaignPipelinesBuilder().forQuiz().build()
    this.setPipelines(pipelines)

    return this
  }

  onGroupIds(groupIds) {
    this.groupIds = groupIds
    return this
  }

  onCampaignId(campaignId) {
    this.campaignId = campaignId
    return this
  }

  setPipelines(pipelines) {
    const { pipeline, errorPipeline, failurePipeline } = pipelines

    this.pipeline = pipeline
    this.errorPipeline = errorPipeline
    this.failurePipeline = failurePipeline
  }

  exec() {
    return new Campaign({
      campaignId: this.campaignId,
      courseIds: this.courseIds,
      errorPipeline: this.errorPipeline,
      failurePipeline: this.failurePipeline,
      groupIds: this.groupIds,
      pipeline: this.pipeline,
      quizIds: this.quizIds,
      type: this.type,
    })
  }
}

new ExecuteCampaign()
  .onCampaignId(1)
  .onCourseIds([1, 2, 3])
  .onGroupIds([1, 2, 3])
  .exec()

export default ExecuteCampaign
