//  Main Script Js

const studentInput = document.getElementById("studentInput")
const addStudentBtn = document.getElementById("addStudentBtn")
const tableBody = document.getElementById("tableBody")
const totalStudents = document.getElementById("totalStudents")
let presentCount = document.getElementById("presentCount")
let absentCount = document.getElementById("absentCount")
let attendancePercent = document.getElementById("attendancePercent")

let studentDataArr = []

class SmartAttendanceManager {
    constructor(studentName) {
        this.studentName = studentName;
        this.isPresent = true;
    }
}

function ShowStudentsData() {

    tableBody.innerHTML = ``
    totalStudents.textContent = studentDataArr.length

    const presentStudents = studentDataArr.filter((element) => {
        return element.isPresent === true
    })

    const absentStudents = studentDataArr.filter((element) => {
        return element.isPresent === false
    })

    presentCount.textContent = presentStudents.length
    absentCount.textContent = absentStudents.length

    const percentageCal = Math.floor((presentStudents.length / studentDataArr.length) * 100)

    attendancePercent.textContent = `${percentageCal}%`

    const errorTrElement = document.createElement("tr")
    if (studentDataArr.length === 0) {
        errorTrElement.innerHTML = `<tr class="empty" id="emptyitem"><td colspan="4">No students added yet</td></tr>`
        tableBody.appendChild(errorTrElement)
        errorTrElement.style.color = `gray`
        attendancePercent.textContent = `0%`
        return
    }

    studentDataArr.forEach((element, index) => {
        const newTrElement = document.createElement("tr")
        newTrElement.innerHTML = `<td>${element.studentName}</td>
                                    <td class="display-position">
                                        <select class="list-items" name="status" id="attendanceStatus">
                                            <option value="present" ${element.isPresent ? "selected" : ""}>P</option>
                                            <option value="absent" ${!element.isPresent ? "selected" : ""}>A</option>
                                        </select>
                                    </td>
                                    <td><input class="toggle-btn"  type="checkbox" id="toggleBtn" name="toggleBtn" data-index= ${index} ${element.isPresent ? "checked" : ""}></td>
                                    <td><input class="delete-btn" type="button" id="delBtn" value="DEL" data-index=${index} ></td>`
        tableBody.appendChild(newTrElement)
    });
}

addStudentBtn.onclick = () => {

    const fetchValue = studentInput.value
    const studentData = new SmartAttendanceManager(fetchValue)
    const nameRegex = /^[A-Za-z ]+$/;

    if (typeof studentData.studentName === "undefined" || !nameRegex.test(studentData.studentName)) {
        alert("Please Enter Student Name Correctly..!")
    } else {


        studentDataArr.push(studentData)
        studentInput.value = ``
    }

    ShowStudentsData()

}

// Student Deletion
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const deletion = e.target.dataset.index
        studentDataArr.splice(deletion, 1)
        ShowStudentsData()
        return
    }

    if (e.target.classList.contains("toggle-btn")) {
        const toggleSelect = e.target.dataset.index
        studentDataArr[toggleSelect].isPresent = e.target.checked
        ShowStudentsData()
        return
    }

})

