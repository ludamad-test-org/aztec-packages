import { BufferReader } from '@aztec/foundation/serialize';

import { serializeToBuffer } from '../utils/serialize.js';
import { PartialStateReference } from './partial_state_reference.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';

/**
 * Stores snapshots of all the trees but archive.
 */
export class StateReference {
  constructor(
    /** Snapshot of the l1 to l2 message tree. */
    public l1ToL2MessageTree: AppendOnlyTreeSnapshot,
    /** Reference to the rest of the state. */
    public partial: PartialStateReference,
  ) {}

  toBuffer() {
    return serializeToBuffer(this.l1ToL2MessageTree, this.partial);
  }

  static fromBuffer(buffer: Buffer | BufferReader): StateReference {
    const reader = BufferReader.asReader(buffer);
    return new StateReference(reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(PartialStateReference));
  }
}
