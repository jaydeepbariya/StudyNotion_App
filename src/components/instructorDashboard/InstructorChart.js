import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);


const InstructorChart = ({courses}) => {

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
  }
  
  const options = {

  }

  return (
    <div>
      <p>Visualise</p>
      <div>
        <Pie 
            data={chartDataForStudents}
            options={options}
        />
      </div>
      <div>
        <Pie 
            data={chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
