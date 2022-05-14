const assert = require('assert');
/**
 * Simple version for finding a needle in a single string
 */

const findNeedle = (haystack, needle) => {
	for (let i = 0; i < haystack.length; i++) {
		if (haystack[i] !== needle[0]) continue;
		let exists = true;
		for (let j = 1; j < needle.length && exists; j++) {
			if (haystack[i+j] === needle[j]) continue;
			exists = false;
		}
		if (exists) return true;
	}

	return false;
};

console.log("Testing findNeedle...");
assert(findNeedle("hello there", "o th")) // => true
assert(findNeedle("hello there", "lo")) // => true
assert(findNeedle("hello there", "ell")) // => true
assert(!findNeedle("hello there", "their")) // => false
console.log('All tests passed!');

/**
 * Finds a needle given a list of string buffers
 */

class ListNode {
	value = "";
	next = null;

	constructor(value, next=null) {
		this.value = value;
		this.next = next;
	}
}

const node1 = new ListNode("re");
const node2 = new ListNode("hello the", node1);
const node3 = new ListNode(" nodes", node2);
const head = new ListNode("text", node3);


const findNeedleLinkedList = (haystack, needle) => {
	let curr = haystack;
	let j = 0;
	while (curr !== null) {
		let i = 0;
		while (i < curr.value.length) {
			let existsInNode = true;
			if (curr.value[i] === needle[j]) {
				j++;
				i++;
			}
			else {
				i++;
				continue;
			}
			while (j < needle.length && i < curr.value.length) {
				if (curr.value[i] === needle[j]) {
					j++;
					i++;
					continue;
				}
				i++;
				existsInNode = false;
				break;
			}
			if (!existsInNode) {
				j = 0;
			}
			else if (existsInNode && j === needle.length) {
				return true;
			}
		}
		curr = curr.next;
	}
	return false;
};

console.log("Testing findNeedleLinkedList...");
assert(findNeedleLinkedList(head, "text nodeshello"), 'text nodeshello');
assert(!findNeedleLinkedList(head, "text nodes hello"), 'text nodes hello');
assert(!findNeedleLinkedList(head, "hello this is a really long string that doesn't fit."), "hello this is a really long string that doesn't fit.");
assert(!findNeedleLinkedList(head, "tet"), 'tet');
assert(findNeedleLinkedList(head, "text no"), 'text no');
assert(findNeedleLinkedList(head, "there"), 'there');
console.log('All tests passed!');

/**
 * Same as above but adapted to use streams to simulate real life buffers
 */

const fs = require('fs');

const BUFFER_SIZE = 10;
const STREAM_OPTS = {
    encoding: 'utf-8',
    highWaterMark: BUFFER_SIZE,
}
async function test() {
	console.log('Testing findNeedleStream...');
    const readable1 = fs.createReadStream('./sample.txt', STREAM_OPTS);
    const case1 = await findNeedleStream(readable1, "Streams");
    assert(case1);
    
    const readable2 = fs.createReadStream('./sample1.txt', STREAM_OPTS);
    const case2 = await findNeedleStream(readable2, "Conclusion\nThis was all about the basics of streams.")
    assert(case2);

	console.log("All tests passed!");
}

test();

async function findNeedleStream(haystack, needle) {
    let j = 0;
    for await (const chunk of haystack) {
        let i = 0;
        while (i < chunk.length) {
            let existsInNode = true;
            if (chunk[i] === needle[j]) {
                j++;
                i++;
            }
            else {
                i++;
                continue;
            }
            while (j < needle.length && i < chunk.length) {
                if (chunk[i] === needle[j]) {
                    j++;
                    i++;
                    continue;
                }
                i++;
                existsInNode = false;
                break;
            }
            if (!existsInNode) {
                j = 0;
            }
            else if (existsInNode && j === needle.length) {
                return true;
            }
        }
    }
    return false;
}
