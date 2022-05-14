# Needle in a Haystack

The input into a text editor is comes in a stream of data represented by a linked list. The nodes contain strings of varying length. Given a linked list and a string, return true if the string exists in the linked list and false if it does not.

{ Node value: "hello there" } -> { Node value: " my na" } -> { Node value: "me is" } -> { Node value: " sam" }

"hello" => true
"my name" => true
"my name is not" => false

Constraints

1) Perform it using character comparison and without any helper methods for string searching.