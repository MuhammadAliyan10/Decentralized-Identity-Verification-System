import crypto from "crypto";

interface BlockData {
  index: number;
  previousHash: string;
  data: JSON;

  timestamp: Date;
}

export function generateHash(block: BlockData): string {
  const { index, previousHash, data, timestamp } = block;
  const blockString = `${index}${previousHash}${JSON.stringify(
    data
  )}${timestamp.toISOString()}`;
  const hash = crypto.createHash("sha256").update(blockString).digest("hex");
  return hash;
}
