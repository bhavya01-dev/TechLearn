export const questions = [
  // ============ EASY QUESTIONS ============
  {
    id: 1,
    title: "1. Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Constraints:**
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    testCases: [
      { id: 1, input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], isHidden: false },
      { id: 2, input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], isHidden: false },
      { id: 3, input: { nums: [3, 3], target: 6 }, expected: [0, 1], isHidden: false },
      { id: 4, input: { nums: [1, 5, 3, 7, 2], target: 9 }, expected: [1, 3], isHidden: true },
      { id: 5, input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4], isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your code here\n        pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}"
    },
    hints: ["Try using a hash map to store values.", "What if you store the complement?"],
    solution: "Use a hash map to store each number's index. For each number, check if target - num exists in the map."
  },
  {
    id: 2,
    title: "2. Palindrome Number",
    difficulty: "Easy",
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

**Example 1:**
\`\`\`
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
\`\`\`

**Example 2:**
\`\`\`
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-.
\`\`\`

**Constraints:**
- \`-2^31 <= x <= 2^31 - 1\`
`,
    examples: [
      { input: "x = 121", output: "true" },
      { input: "x = -121", output: "false" }
    ],
    testCases: [
      { id: 1, input: { x: 121 }, expected: true, isHidden: false },
      { id: 2, input: { x: -121 }, expected: false, isHidden: false },
      { id: 3, input: { x: 10 }, expected: false, isHidden: false },
      { id: 4, input: { x: 12321 }, expected: true, isHidden: true },
      { id: 5, input: { x: 0 }, expected: true, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Your code here\n        pass",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n}"
    },
    hints: ["Negative numbers are not palindromes.", "Can you reverse only half of the number?"],
    solution: "Reverse half the number and compare with the other half to avoid overflow."
  },
  {
    id: 3,
    title: "3. Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^4\`
`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" }
    ],
    testCases: [
      { id: 1, input: { s: "()" }, expected: true, isHidden: false },
      { id: 2, input: { s: "()[]{}" }, expected: true, isHidden: false },
      { id: 3, input: { s: "(]" }, expected: false, isHidden: false },
      { id: 4, input: { s: "([{}])" }, expected: true, isHidden: true },
      { id: 5, input: { s: "((()))" }, expected: true, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Your code here\n        pass",
      java: "class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}"
    },
    hints: ["Use a stack data structure.", "Push opening brackets, pop for closing."],
    solution: "Use a stack. Push opening brackets and pop when you see a closing bracket that matches."
  },
  {
    id: 4,
    title: "4. FizzBuzz",
    difficulty: "Easy",
    description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:
- \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
- \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
- \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
- \`answer[i] == i\` (as a string) if none of the above conditions are true.

**Example 1:**
\`\`\`
Input: n = 3
Output: ["1","2","Fizz"]
\`\`\`

**Constraints:**
- \`1 <= n <= 10^4\`
`,
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]' },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' }
    ],
    testCases: [
      { id: 1, input: { n: 3 }, expected: ["1", "2", "Fizz"], isHidden: false },
      { id: 2, input: { n: 5 }, expected: ["1", "2", "Fizz", "4", "Buzz"], isHidden: false },
      { id: 3, input: { n: 15 }, expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], isHidden: false },
      { id: 4, input: { n: 1 }, expected: ["1"], isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def fizzBuzz(self, n: int) -> List[str]:\n        # Your code here\n        pass",
      java: "class Solution {\n    public List<String> fizzBuzz(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}"
    },
    hints: ["Check divisibility by 15 first.", "Use modulo operator."],
    solution: "Iterate from 1 to n, check divisibility conditions in order of priority."
  },

  // ============ MEDIUM QUESTIONS ============
  {
    id: 5,
    title: "5. Reverse String",
    difficulty: "Medium",
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with \`O(1)\` extra memory.

**Example 1:**
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^5\`
`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
    ],
    testCases: [
      { id: 1, input: { s: ["h", "e", "l", "l", "o"] }, expected: ["o", "l", "l", "e", "h"], isHidden: false },
      { id: 2, input: { s: ["H", "a", "n", "n", "a", "h"] }, expected: ["h", "a", "n", "n", "a", "H"], isHidden: false },
      { id: 3, input: { s: ["a"] }, expected: ["a"], isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        # Your code here\n        pass",
      java: "class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}"
    },
    hints: ["Use two pointers.", "Swap characters from both ends."],
    solution: "Use two pointers starting from both ends and swap characters until they meet."
  },
  {
    id: 6,
    title: "6. Longest Substring Without Repeating",
    difficulty: "Medium",
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 5 * 10^4\`
`,
    examples: [
      { input: 's = "abcabcbb"', output: "3" },
      { input: 's = "bbbbb"', output: "1" }
    ],
    testCases: [
      { id: 1, input: { s: "abcabcbb" }, expected: 3, isHidden: false },
      { id: 2, input: { s: "bbbbb" }, expected: 1, isHidden: false },
      { id: 3, input: { s: "pwwkew" }, expected: 3, isHidden: false },
      { id: 4, input: { s: "" }, expected: 0, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Your code here\n        pass",
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n}"
    },
    hints: ["Use sliding window technique.", "Track characters with a set or map."],
    solution: "Use sliding window with a hash set to track characters in current window."
  },
  {
    id: 7,
    title: "7. Container With Most Water",
    difficulty: "Medium",
    description: `You are given an integer array \`height\` of length \`n\`. Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Example 1:**
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
\`\`\`

**Constraints:**
- \`2 <= n <= 10^5\`
`,
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }
    ],
    testCases: [
      { id: 1, input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expected: 49, isHidden: false },
      { id: 2, input: { height: [1, 1] }, expected: 1, isHidden: false },
      { id: 3, input: { height: [4, 3, 2, 1, 4] }, expected: 16, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        # Your code here\n        pass",
      java: "class Solution {\n    public int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n}"
    },
    hints: ["Use two pointers from both ends.", "Move the pointer with smaller height."],
    solution: "Two pointer approach: start from both ends, move the smaller height pointer inward."
  },
  {
    id: 8,
    title: "8. 3Sum",
    difficulty: "Medium",
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

**Example 1:**
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
\`\`\`

**Constraints:**
- \`3 <= nums.length <= 3000\`
`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
    ],
    testCases: [
      { id: 1, input: { nums: [-1, 0, 1, 2, -1, -4] }, expected: [[-1, -1, 2], [-1, 0, 1]], isHidden: false },
      { id: 2, input: { nums: [0, 1, 1] }, expected: [], isHidden: false },
      { id: 3, input: { nums: [0, 0, 0] }, expected: [[0, 0, 0]], isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        # Your code here\n        pass",
      java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}"
    },
    hints: ["Sort the array first.", "Fix one number and use two pointers for the rest."],
    solution: "Sort array, then for each element use two pointers to find pairs that sum to its negative."
  },

  // ============ HARD QUESTIONS ============
  {
    id: 9,
    title: "9. Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

**Example 1:**
\`\`\`
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
\`\`\`

**Constraints:**
- \`0 <= m <= 1000\`, \`0 <= n <= 1000\`
`,
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" }
    ],
    testCases: [
      { id: 1, input: { nums1: [1, 3], nums2: [2] }, expected: 2.0, isHidden: false },
      { id: 2, input: { nums1: [1, 2], nums2: [3, 4] }, expected: 2.5, isHidden: false },
      { id: 3, input: { nums1: [], nums2: [1] }, expected: 1.0, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        # Your code here\n        pass",
      java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Your code here\n        return 0.0;\n    }\n}"
    },
    hints: ["Use binary search on the smaller array.", "Partition both arrays to find median."],
    solution: "Binary search on smaller array to find correct partition point."
  },
  {
    id: 10,
    title: "10. Regular Expression Matching",
    difficulty: "Hard",
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\`.

**Example 1:**
\`\`\`
Input: s = "aa", p = "a*"
Output: true
\`\`\`

**Constraints:**
- \`1 <= s.length <= 20\`, \`1 <= p.length <= 20\`
`,
    examples: [
      { input: 's = "aa", p = "a"', output: "false" },
      { input: 's = "aa", p = "a*"', output: "true" }
    ],
    testCases: [
      { id: 1, input: { s: "aa", p: "a" }, expected: false, isHidden: false },
      { id: 2, input: { s: "aa", p: "a*" }, expected: true, isHidden: false },
      { id: 3, input: { s: "ab", p: ".*" }, expected: true, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        # Your code here\n        pass",
      java: "class Solution {\n    public boolean isMatch(String s, String p) {\n        // Your code here\n        return false;\n    }\n}"
    },
    hints: ["Use dynamic programming.", "Consider cases for '.' and '*' separately."],
    solution: "DP approach: dp[i][j] represents if s[0..i-1] matches p[0..j-1]."
  },
  {
    id: 11,
    title: "11. Merge k Sorted Lists",
    difficulty: "Hard",
    description: `You are given an array of \`k\` linked-lists \`lists\`, each sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

**Example 1:**
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
\`\`\`

**Constraints:**
- \`0 <= k <= 10^4\`
`,
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }
    ],
    testCases: [
      { id: 1, input: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] }, expected: [1, 1, 2, 3, 4, 4, 5, 6], isHidden: false },
      { id: 2, input: { lists: [] }, expected: [], isHidden: false },
      { id: 3, input: { lists: [[]] }, expected: [], isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        # Your code here\n        pass",
      java: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Your code here\n        return null;\n    }\n}"
    },
    hints: ["Use a min-heap (priority queue).", "Divide and conquer approach also works."],
    solution: "Use a min-heap to always get the smallest element across all lists."
  },
  {
    id: 12,
    title: "12. Trapping Rain Water",
    difficulty: "Hard",
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

**Example 1:**
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
\`\`\`

**Constraints:**
- \`1 <= n <= 2 * 10^4\`
`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
    ],
    testCases: [
      { id: 1, input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, expected: 6, isHidden: false },
      { id: 2, input: { height: [4, 2, 0, 3, 2, 5] }, expected: 9, isHidden: false },
      { id: 3, input: { height: [1, 2, 3, 4, 5] }, expected: 0, isHidden: true }
    ],
    starterCode: {
      python: "class Solution:\n    def trap(self, height: List[int]) -> int:\n        # Your code here\n        pass",
      java: "class Solution {\n    public int trap(int[] height) {\n        // Your code here\n        return 0;\n    }\n}"
    },
    hints: ["Calculate left and right max for each position.", "Two pointer approach is optimal."],
    solution: "Two pointers: track leftMax and rightMax, add water based on the smaller max."
  }
];

// Utility functions
export const getQuestionsByDifficulty = (difficulty) => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const getTodaysQuestion = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return questions[dayOfYear % questions.length];
};

export const getQuestionById = (id) => {
  return questions.find(q => q.id === id);
};

// Mock code execution - In production, this would call a backend API
export const executeCode = async (code, language, testCases) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // This is a MOCK - In production, you'd send code to a secure backend
  // that runs it in a sandboxed environment (Docker, AWS Lambda, etc.)

  // For demo purposes, randomly pass/fail some test cases
  const results = testCases.map((tc, index) => {
    // Simulate: first 2 test cases always pass if code is not starter code
    const isStarterCode = code.includes('pass') || code.includes('return new int[]{}') || code.includes('return 0;') || code.includes('return false;');

    if (isStarterCode) {
      return {
        id: tc.id,
        passed: false,
        input: tc.isHidden ? 'Hidden' : JSON.stringify(tc.input),
        expected: tc.isHidden ? 'Hidden' : JSON.stringify(tc.expected),
        actual: 'null / undefined',
        runtime: 0,
        isHidden: tc.isHidden
      };
    }

    // Simulate random pass/fail for demo
    const passed = Math.random() > 0.2; // 80% pass rate for demo

    return {
      id: tc.id,
      passed,
      input: tc.isHidden ? 'Hidden' : JSON.stringify(tc.input),
      expected: tc.isHidden ? 'Hidden' : JSON.stringify(tc.expected),
      actual: passed ? JSON.stringify(tc.expected) : 'Different value',
      runtime: Math.floor(Math.random() * 10) + 1,
      isHidden: tc.isHidden
    };
  });

  const allPassed = results.every(r => r.passed);
  const passedCount = results.filter(r => r.passed).length;

  return {
    success: allPassed,
    results,
    passedCount,
    totalCount: testCases.length,
    totalRuntime: results.reduce((sum, r) => sum + r.runtime, 0),
    memory: Math.floor(Math.random() * 10) + 40 // Random memory usage
  };
};
