import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { VideoAdded } from "../generated/schema"
import { VideoAdded as VideoAddedEvent } from "../generated/threetube/threetube"
import { handleVideoAdded } from "../src/threetube"
import { createVideoAddedEvent } from "./threetube-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let videoId = BigInt.fromI32(234)
    let cid = "Example string value"
    let metadata = "Example string value"
    let newVideoAddedEvent = createVideoAddedEvent(videoId, cid, metadata)
    handleVideoAdded(newVideoAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("VideoAdded created and stored", () => {
    assert.entityCount("VideoAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "VideoAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videoId",
      "234"
    )
    assert.fieldEquals(
      "VideoAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cid",
      "Example string value"
    )
    assert.fieldEquals(
      "VideoAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
