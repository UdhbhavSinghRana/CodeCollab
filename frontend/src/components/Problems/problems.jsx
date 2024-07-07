import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import './problems.css'; // Ensure Tailwind CSS styles are properly imported

function Problems({ isOpen, setIsSideDrawerOpen  }) {
  const [selectedProblemConstraints, setSelectedProblemConstraints] = useState('');
  const [selectedProblemComplex, setSelectedProblemComplex] = useState('');
  const [selectedProblemTC, setSelectedProblemTC] = useState('');
  const [selectedProblemDesc, setSelectedProblemDesc] = useState('');
  const [selectedProblemName, setSelectedProblemName] = useState('');
  const [isShow, setIsShow] = useState(false);

  const handleClick = (problem) => {
    setSelectedProblemConstraints(problem.constraints);
    setSelectedProblemComplex(problem.expectedComplexity);
    setSelectedProblemTC(problem.testcase);
    setSelectedProblemDesc(problem.description);
    setSelectedProblemName(problem.name);
    setIsSideDrawerOpen(false); // Close sidebar when problem is clicked
  };

  const problems = [
    {
      name: "Missing number in array",
      description: `Given an array of size N-1 such that it only contains distinct integers in the range of 1 to N. Find the missing element.

Your Task :You don't need to read input or print anything. Complete the function MissingNumber() that takes array and N as input parameters and returns the value of the missing number.`,
      testcase: `Test Case:        
Input:
N = 5
A[] = {1,2,3,5}
Output: 4

Input:
N = 10
A[] = {6,1,2,8,3,4,7,10,5}
Output: 9`,
      expectedComplexity: `Expected Time Complexity: O(N)
Expected Auxiliary Space: O(1)`,
      constraints: `Constraints:
1 ≤ N ≤ 106
1 ≤ A[i] ≤ 106`,
    },
    {
      name: "Stock buy and sell",
      description: `The cost of stock on each day is given in an array A[] of size N. Find all the segments of days on which you buy and sell the stock so that in between those days your profit is maximum.
Note: Since there can be multiple solutions, the driver code will print 1 if your answer is correct, otherwise, it will return 0. In case there's no profit the driver code will print the string "No Profit" for a correct solution.`,
      testcase: `Test Case:        
Input:
N = 7
A[] = {100,180,260,310,40,535,695}
Output:
1
Explanation:
One possible solution is (0 3) (4 6) We can buy stock on day 0, and sell it on 3rd day, which will give us maximum profit. Now, we buy stock on day 4 and sell it on day 6.
Example 2:

Input:
N = 5
A[] = {4,2,2,2,4}
Output:
1
Explanation:
There are multiple possible solutions one of them is (3 4). We can buy stock on day 3, and sell it on 4th day, which will give us maximum profit.`,
      expectedComplexity: `Expected Time Complexity: O(N)
Expected Auxiliary Space: O(N)`,
      constraints: `Constraints:
2 ≤ N ≤ 106
0 ≤ A[i] ≤ 106`,
    },
    {
      name: "Subarray with given sum",
      description: `Given an unsorted array A of size N that contains only non-negative integers, find a continuous sub-array that adds to a given number S and return the left and right index(1-based indexing) of that subarray.
In case of multiple subarrays, return the subarray indexes which come first on moving from left to right.

Note:- You have to return an ArrayList consisting of two elements left and right. In case no such subarray exists return an array consisting of element -1.`,
      testcase: `Test Case:        
Input:
N = 5, S = 12
A[] = {1,2,3,7,5}
Output: 2 4
Explanation: The sum of elements from 2nd position to 4th position is 12.
  
Input:
N = 10, S = 15
A[] = {1,2,3,4,5,6,7,8,9,10}
Output: 1 5
Explanation: The sum of elements from 1st position to 5th position is 15.`,
      expectedComplexity: `Expected Time Complexity: O(N)
Expected Auxiliary Space: O(1)`,
      constraints: `Constraints:
2 ≤ N ≤ 105
0 ≤ A[i] ≤ 109`,
    }
  ];

  return (
    <div className='flex justify-center content-center'>
      {/* Sidebar */}
      <div className={`SideDrawer ${isOpen  ? 'open' : ''}`}>
        <div className='flex justify-end p-4'>
          <IoMdClose className='close-button' onClick={() => setIsSideDrawerOpen(false)} />
        </div>
        {/* Sidebar content */}
        <ul>
          {problems.map((problem, index) => (
            <li key={index}>
              <button
                className='block text-left px-4 py-2 w-full'
                onClick={() => {
              handleClick(problem);
              setIsShow(true);
            }}
              >
                {problem.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Problem details section */}
      <div className="flex overflow-auto bg-neutral-700 text-white">       {isShow && (
          <div className="p-10">
            <div
              className="absolute inline right-10 text-4xl cursor-pointer bg-neutral-700 text-white "
              onClick={() => {
                setIsShow(false);
              }}
            >
              &#x2715;
            </div>
            <div className="font-mono">
              <div className="font-bold text-4xl capitalize">{selectedProblemName}</div>
                <br/> 
                <div>{selectedProblemDesc}</div>
                <br/> 
                <pre>{selectedProblemTC}</pre>
                <br/> 
                <pre>{selectedProblemConstraints}</pre>
                <br/> 
                <pre>{selectedProblemComplex}</pre>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default Problems;
