import { getList } from '/JS/fireScript.js'
let meetingTable = document.getElementById('meetings').getElementsByTagName('tbody')[0]
let userTable = document.getElementById('users').getElementsByTagName('tbody')[0]

window.onload = async function () {
    const meetinglist = await getList('Meetings')
    const userlist = await getList('UsersAuthList')

    if (meetinglist.exists()) populateTable(meetinglist, true)
    if (userlist.exists()) populateTable(userlist, false)
};

function populateTable(listName, g) {
    listName.forEach((data) => {
        const values = data.val()
        if (g) filterMeetings(values)
        else{
            userTable.append(createRow('Users', values))
        }
    });
}

function filterMeetings(values) {
    if (values.roles.includes('Admin'))
        meetingTable.append(createRow('Meetings', values))
}

function createRow(tableName, valueArray) {
    const row = document.createElement('tr');
    switch (tableName) {
        case 'Meetings': {
            const name = document.createElement('td');
            const desc = document.createElement('td');
            const status = document.createElement('td');
            const join = document.createElement('td');
            const joinlink = document.createElement('a');

            name.textContent = valueArray.summary.split("(Meeting)")[0];
            desc.textContent = valueArray.description;
            status.textContent = checkTime(valueArray.start_time, valueArray.end_time);
            if (status.textContent === 'Ongoing') {
                status.style.fontWeight = 'bold';
                status.style.textDecoration = "underline"
            }

            joinlink.classList.add('join-link');
            joinlink.addEventListener('click', () => {
                window.open(`https://meet.google.com/${valueArray.meeting_id}`, '_blank');
            });
            joinlink.textContent = 'Join';
            join.appendChild(joinlink)


            row.appendChild(name)
            row.appendChild(desc)
            row.appendChild(status)
            row.appendChild(join)
        }break;
        case 'Users':{
            const username = document.createElement('td');
            const email = document.createElement('td');
            const role = document.createElement('td');

            username.textContent = valueArray.username;
            email.textContent = valueArray.email;
            role.textContent = valueArray.user_type;

            row.appendChild(username)
            row.appendChild(email)
            row.appendChild(role)
        }
    }

    return row;
}

function checkTime(startTime, endTime) {
    const date = new Date();
    if (date >= new Date(startTime) && date < new Date(endTime)) return "Ongoing";
    else if (date < new Date(startTime)) return "Upcoming"
    else return "Finished"
}
