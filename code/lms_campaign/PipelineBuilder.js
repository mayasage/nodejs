import campaignOnCoursePipelines from './pipelines/campaignOnCoursePipelines.js'
import campaignOnQuizPipelines from './pipelines/campaignOnQuizPipelines.js'

class CampaignPipelinesBuilder {
  forCourse() {
    this.pipeline = campaignOnCoursePipelines.pipeline
    this.errorPipeline = campaignOnCoursePipelines.errorPipeline
    this.failurePipeline = campaignOnCoursePipelines.failurePipeline

    return this
  }

  forQuiz() {
    this.pipeline = campaignOnQuizPipelines.pipeline
    this.errorPipeline = campaignOnQuizPipelines.errorPipeline
    this.failurePipeline = campaignOnQuizPipelines.failurePipeline

    return this
  }

  build() {
    return this
  }
}

const { pipeline, errorPipeline, failurePipeline } =
  new CampaignPipelinesBuilder().forCourse().build()

export default CampaignPipelinesBuilder
