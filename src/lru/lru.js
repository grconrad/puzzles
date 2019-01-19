/**
Implement an LRU (Least Recently Used) cache. It should be able to be initialized with a cache size n, and contain the following methods:

set(key, value): sets key to value. If there are already n items in the cache and we are adding a new item, then it should also remove the least recently used item.

get(key): gets the value at key. If no such key exists, return null.

Each operation should run in O(1) time.
*/

// Need to access in O(1) time by key --> need hashmap (JS object is simplest impl).
// Need sequence, which suggest an array, but also need to move things from mid-sequence to the end in O(1) time --> use doubly-linked list.
// Values in hashmap will point to array entries.
// Keep both in sync.

class LRU {

    // Instantiate with a predefined size.
    constructor(size) {
        if (size < 1) {
            throw 'Size too small, must be >= 2';
        }
        this.MAX_SIZE = size;

        this.entriesByKey = {};

        this.numEntries = 0;

        // Doubly-linked list so we can move items from middle to end in constant time
        this.oldest = null; // head ptr
        this.newest = null; // tail ptr

        this._assertOk();
    }

    set(key, val) {
        // Get existing entry for this key, if any.
        let entry = this._getAndMoveToEnd(key); // may be null
        if (entry) {
            entry.value = val;
        } else {
            // Create new entry.
            entry = {
                key: key,
                value: val,
                prev: this.newest,
                next: null
            };
            this.entriesByKey[key] = entry;
            if (!this.oldest) {
                this.oldest = entry;
            }
            if (this.newest) {
                this.newest.next = entry;
            }
            this.newest = entry;
            // Check/update size, and delete oldest if necessary.
            if (this.numEntries < this.MAX_SIZE) {
                this.numEntries++;
            } else {
                // Delete oldest
                const oldest = this.oldest,
                    oldestKey = oldest.key,
                    secondOldest = oldest.next;
                delete this.entriesByKey[oldestKey];
                this.oldest = secondOldest;
                this.oldest.prev = null;
            }
        }

        this._assertOk();
    }

    _assertOk() {
        if (this.numEntries === 0) {
            if (this.oldest || this.newest) {
                throw 'Should not have oldest or newest in empty LRU';
            }
        } else {
            if (this.numEntries > this.MAX_SIZE) {
                throw 'Too many entries in LRU';
            }
            if (!this.oldest || !this.newest) {
                throw 'Missing oldest or newest ptr in non-empty LRU';
            }
            if (this.oldest.prev) {
                throw 'Oldest prev is non-null';
            }
            if (this.newest.next) {
                throw 'Newest next is non-null';
            }
        }
    }

    _getAndMoveToEnd(key) {
        const entry = this.entriesByKey[key];
        if (entry) {
            const prev = entry.prev;
            const next = entry.next;
            if (!next) {
                // It's the newest, nothing to do!
                if (this.newest !== entry) {
                    throw 'Unexpected entry with no next ptr, but not newest';
                }
            } else {
                if (prev) {
                    // It's a "middle" entry
                    prev.next = next;
                    next.prev = prev;
                } else {
                    // It's the oldest
                    if (this.oldest !== entry) {
                        throw 'Unexpected entry with no prev ptr, but not oldest';
                    }
                    this.oldest = next;
                    next.prev = null;
                }
                this.newest.next = entry;
                entry.prev = this.newest;
                entry.next = null;
                this.newest = entry;
            }
        }
        this._assertOk();
        return entry || null;
    }

    get(key) {
        const entry = this._getAndMoveToEnd(key);
        return entry && entry.value; // null if not found
    }

    toString() {
        const all = [];
        for (let entry = this.oldest; entry; entry = entry.next) {
            all.push(`${entry.key}=${entry.value}`);
        }
        if (all.length !== this.numEntries) {
            throw `Only found ${all.length} elements in sequence, but numEntries == ${this.numEntries}`;
        }
        return `[${all.join(' ')}] (${this.numEntries} entries)`;
    }

}

module.exports = LRU;