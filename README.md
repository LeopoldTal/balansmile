# balansmile

## The problem

A message is **balanced** iff:

- it contains no parentheses, or
- it's a smiley `:)` or `:(`, or
- it's the concatenation of two balanced messages, or
- it's a balanced message surrounded by parentheses.

Take as input a string and return whether it's balanced.

### Examples

`:)` is balanced: it's a smiley. But so is `(:)`: it's the text `:` inside a matched pair of parentheses. So is `(:))`: it's the smiley `:)` surrounded by parens.

However, `:))`, `((:)`, and `:)(` are unbalanced: no matter how we interpret `:)`, we can't match the remaining parens.

## Solution without smileys

Let's first consider the simplified version of the problem, without smileys.

To solve this, **we only need to keep track of the current nesting depth**. Initially, nesting depth is 0. It increases whenever we encounter an opening paren, and decreases whenever we encounter a closing one.

For example, `()(())` is balanced:

```
		0
(		1
)		0
(		1
	(	2
	)	1
)		0
		We're back to the top level, so it's balanced.
```

And `())(` is unbalanced:

```
	0
(	1
)	0
)	-1: we're trying to close more parentheses than we opened: unbalanced!
(	never examined
```

Similarly, `(()` is unbalanced:

```
		0
(		1
	(	2
	)	1
		There are still unclosed parens: unbalanced!
```

## Generalising to smileys

### Operations

Encountering a smiley gives us a choice: we can treat it as text, or as a paren. If either interpretation produces a balanced message, then the message is balanced.

Therefore, we no longer have a single current nesting depth, but a **set** of nesting depths we can choose to be at, by choosing which smileys we interpret as text or as parens.

As before, encountering `(` not preceded by `:` increments every element of this set.

Likewise, encountering `)` not preceded by `:` decrements every element. If there is a possible parse where we were already at the top level (that is, if 0 is in the set), then that parse retroactively becomes impossible. As a result, the set may become empty: this means that the string is unbalanced, no matter how we choose to parse it.

When we encounter `:(`, we can treat it as text and keep the current nesting depth; or we can treat it as an opening paren, and increment the depth. Thus, every element of the set remains there, and we also add its successor. (Naively, this would double the number of elements, but see below.)

Likewise, when we encounter `:)`, we can treat it as text and keep the current nesting depth; or, if we're not already at the top level, we can treat it as a closing paren, and decrement the depth. Thus, every element of the set remains there, and we also add the predecessor of every nonzero element.

When we reach the end of the string, if 0 is inside the set, then there's a possible parse where the string is balanced. Otherwise, it's unbalanced no matter what interpretation we choose.

### Optimisation

Our set of nesting depths is really a **range** of consecutive nonnegative integers, and we need only keep track of its endpoints. We can prove this recursively by considering each of the operations on this set.

Initially, the set is of possible nesting depths is `{0}`. Each of the possible operations preserves contiguousness:

| Token | Previous range |   New range   |
|-------|---------------:|--------------:|
| `(`   |      `{a … b}` | `{a+1 … b+1}` |
| `)`   |          `{0}` |    Unbalanced |
| `)`   |    `{0 … b>0}` |   `{0 … b-1}` |
| `)`   |  `{a>0 … b>0}` | `{a-1 … b-1}` |
| `:(`  |      `{a … b}` |   `{a … b+1}` |
| `:)`  |      `{0 … b}` |     `{0 … b}` |
| `:)`  |    `{a>0 … b}` |   `{a-1 … b}` |

This can be summed up as the following transitions on the range endpoints, with clamping at depth 0:

| Token | Min depth | Max depth |
|-------|----------:|----------:|
| `(`   |        +1 |        +1 |
| `)`   |        -1 |        -1 |
| `:(`  |        +0 |        +1 |
| `:)`  |        -1 |        -0 |

Since the smallest possible nesting depth is 0, we only need to check that the range never becomes empty, and that the minimum is back to 0 when we reach the end of the string.

## Usage

### Install

```
git clone https://github.com/LeopoldTal/balansmile.git
cd balansmile
yarn
```

### Run

```
yarn start 'some string (possibly with smileys :) (if you want))'
```

### Tests

```
yarn test
```
