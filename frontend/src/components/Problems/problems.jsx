import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import './problems.css';

const initialProblemsData = [
  {
    id: '1',
    name: 'Missing number in array',
    description: `Given an array of size N-1 such that it only contains distinct integers in the range of 1 to N. Find the missing element.\n\nYour Task: Complete the function MissingNumber() that takes array and N as input parameters and returns the value of the missing number.`,
    testcase: `Test Case:\nInput:\nN = 5\nA[] = {1,2,3,5}\nOutput: 4\n\nInput:\nN = 10\nA[] = {6,1,2,8,3,4,7,10,5}\nOutput: 9`,
    expectedComplexity: `Expected Time Complexity: O(N)\nExpected Auxiliary Space: O(1)`,
    constraints: `Constraints:\n1 ≤ N ≤ 10^6\n1 ≤ A[i] ≤ 10^6`,
  },
  {
    id: '2',
    name: 'Stock buy and sell',
    description: `The cost of stock on each day is given in an array A[] of size N. Find all the segments of days on which you buy and sell the stock so that in between those days your profit is maximum.`,
    testcase: `Test Case:\nInput:\nN = 7\nA[] = {100,180,260,310,40,535,695}\nOutput: 1\nExplanation: One possible solution is (0 3) (4 6).`,
    expectedComplexity: `Expected Time Complexity: O(N)\nExpected Auxiliary Space: O(N)`,
    constraints: `Constraints:\n2 ≤ N ≤ 10^6\n0 ≤ A[i] ≤ 10^6`,
  },
  {
    id: '3',
    name: 'Subarray with given sum',
    description: `Given an unsorted array A of size N that contains only non-negative integers, find a continuous sub-array that adds to a given number S and return the left and right index(1-based indexing) of that subarray.`,
    testcase: `Test Case:\nInput:\nN = 5, S = 12\nA[] = {1,2,3,7,5}\nOutput: 2 4\nExplanation: The sum of elements from 2nd position to 4th position is 12.`,
    expectedComplexity: `Expected Time Complexity: O(N)\nExpected Auxiliary Space: O(1)`,
    constraints: `Constraints:\n2 ≤ N ≤ 10^5\n0 ≤ A[i] ≤ 10^9`,
  },
];

function Problems({ isOpen, setIsSideDrawerOpen }) {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [problemsData, setProblemsData] = useState(initialProblemsData);
  const { register, handleSubmit, reset } = useForm();

  const handleClick = (problem) => {
    setSelectedProblem(problem);
    setIsSideDrawerOpen(false);
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleAddProblem = (data) => {
    const newProblem = {
      id: problemsData.length + 1,
      name: data.name,
      description: data.description,
      testcase: data.testcase,
      expectedComplexity: data.expectedComplexity,
      constraints: data.constraints,
    };
    setProblemsData([...problemsData, newProblem]);
    setIsFormOpen(false);
    reset();
  };

  return (
    <div className='flex justify-center content-center'>
      <div className={`SideDrawer ${isOpen ? 'open' : ''}`}>
        <div className='flex justify-between p-4'>
          <IoAddOutline className='close-button' onClick={handleFormOpen} />
          <IoMdClose className='close-button' onClick={() => setIsSideDrawerOpen(false)} />
        </div>
        <ul>
          {problemsData.map((problem, index) => (
            <li key={index}>
              <button
                className='block text-left px-4 py-2 w-full hover:bg-gray-200 rounded-lg text-gray-800'
                onClick={() => handleClick(problem)}
              >
                {problem.id}. {problem.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedProblem && (
        <div className='flex overflow-auto bg-gray-200 text-gray-800 p-10'>
          <div className='absolute top-4 right-4 text-3xl cursor-pointer' onClick={() => setSelectedProblem(null)}>
            &#x2715;
          </div>
          <div className='font-mono'>
            <div className='font-bold text-3xl capitalize'>{selectedProblem.name}</div>
            <br />
            <div>{selectedProblem.description}</div>
            <br />
            <pre>{selectedProblem.testcase}</pre>
            <br />
            <pre>{selectedProblem.constraints}</pre>
            <br />
            <pre>{selectedProblem.expectedComplexity}</pre>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='bg-gray-800 bg-opacity-75 absolute top-0 left-0 w-full h-full'></div>
          <div className='bg-white rounded-lg p-8 w-96 z-50 relative'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Add New Problem</h2>
              <IoMdClose className='cursor-pointer' onClick={handleFormClose} />
            </div>
            <form className='space-y-4' onSubmit={handleSubmit(handleAddProblem)}>
              <input
                type='text'
                {...register('name', { required: true })}
                placeholder='Name'
                className='w-full border-gray-300 rounded-md px-3 py-2'
              />
              <textarea
                {...register('description', { required: true })}
                placeholder='Description'
                rows='4'
                className='w-full border-gray-300 rounded-md px-3 py-2'
              ></textarea>
              <textarea
                {...register('testcase', { required: true })}
                placeholder='Test Case'
                rows='4'
                className='w-full border-gray-300 rounded-md px-3 py-2'
              ></textarea>
              <textarea
                {...register('expectedComplexity', { required: true })}
                placeholder='Expected Complexity'
                rows='2'
                className='w-full border-gray-300 rounded-md px-3 py-2'
              ></textarea>
              <textarea
                {...register('constraints', { required: true })}
                placeholder='Constraints'
                rows='2'
                className='w-full border-gray-300 rounded-md px-3 py-2'
              ></textarea>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                  Add Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Problems;
