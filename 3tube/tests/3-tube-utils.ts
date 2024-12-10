import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  VideoAdded,
  VideoLiked,
  VideoUnLiked,
  VideoViewed
} from "../generated/3tube/3tube"

export function createVideoAddedEvent(
  videoId: BigInt,
  cid: string,
  metadata: string,
  owner: Address
): VideoAdded {
  let videoAddedEvent = changetype<VideoAdded>(newMockEvent())

  videoAddedEvent.parameters = new Array()

  videoAddedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  videoAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return videoAddedEvent
}

export function createVideoLikedEvent(
  videoId: BigInt,
  likes: BigInt
): VideoLiked {
  let videoLikedEvent = changetype<VideoLiked>(newMockEvent())

  videoLikedEvent.parameters = new Array()

  videoLikedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoLikedEvent.parameters.push(
    new ethereum.EventParam("likes", ethereum.Value.fromUnsignedBigInt(likes))
  )

  return videoLikedEvent
}

export function createVideoUnLikedEvent(
  videoId: BigInt,
  likes: BigInt
): VideoUnLiked {
  let videoUnLikedEvent = changetype<VideoUnLiked>(newMockEvent())

  videoUnLikedEvent.parameters = new Array()

  videoUnLikedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoUnLikedEvent.parameters.push(
    new ethereum.EventParam("likes", ethereum.Value.fromUnsignedBigInt(likes))
  )

  return videoUnLikedEvent
}

export function createVideoViewedEvent(
  videoId: BigInt,
  views: BigInt
): VideoViewed {
  let videoViewedEvent = changetype<VideoViewed>(newMockEvent())

  videoViewedEvent.parameters = new Array()

  videoViewedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoViewedEvent.parameters.push(
    new ethereum.EventParam("views", ethereum.Value.fromUnsignedBigInt(views))
  )

  return videoViewedEvent
}
