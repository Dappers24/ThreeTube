import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  MetadataUpdate as MetadataUpdateEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
  VideoBought as VideoBoughtEvent,
  VideoMinted as VideoMintedEvent,
} from "../generated/Contract/Contract"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  MetadataUpdate,
  OwnershipTransferred,
  Transfer,
  VideoBought,
  VideoMinted,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent,
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVideoBought(event: VideoBoughtEvent): void {
  let entity = new VideoBought(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.tokenId
  entity.buyer = event.params.buyer
  entity.seller = event.params.seller
  entity.metadata = event.params.metadata.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVideoMinted(event: VideoMintedEvent): void {
  let entity = new VideoMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.tokenId
  entity.owner = event.params.owner
  entity.metadata = event.params.metadata.toString()
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
