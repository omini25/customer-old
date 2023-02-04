import { rest } from 'msw';

const userInfo = {
  ID: '2',
  fullname: 'John Doe',
  email: 'johndoe@gmail.com',
  phone_number: '081012345678',
  date_of_birth: null,
  gender: '',
  address: '',
  address_opt: null,
  local_state: null,
  country: null,
  customer_path: '',
  status: '1',
  date_modified: '2021-10-09 23:40:15',
  date_created: '2021-09-08 07:23:24',
  username: 'johndoe@gmail.com',
  username_2: '081012345678',
  user_type: 'customer',
  user_table_id: '1',
  token: null,
  last_login: '2022-01-26 12:45:33',
  activity_log: '1',
  last_logout: null,
  last_change_password: '2021-09-22 09:47:07',
};

export const signInWithEmailSuccess = rest.post('/auth', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: true,
      message: 'Log in successful',
      payload: {
        token:
          'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJJRCI6IjIiLCJmdWxsbmFtZSI6Ik9sdXdhc2V1biBBbGF0aXNlIiwiZW1haWwiOiJob2x5bmF0aW9uZGV2ZWxvcG1lbnRAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMDgxMDk5OTQ0ODUiLCJkYXRlX29mX2JpcnRoIjpudWxsLCJnZW5kZXIiOiIiLCJhZGRyZXNzIjoiIiwiYWRkcmVzc19vcHQiOm51bGwsImxvY2FsX3N0YXRlIjpudWxsLCJjb3VudHJ5IjpudWxsLCJjdXN0b21lcl9wYXRoIjoiIiwic3RhdHVzIjoiMSIsImRhdGVfbW9kaWZpZWQiOiIyMDIxLTEwLTA5IDIzOjQwOjE1IiwiZGF0ZV9jcmVhdGVkIjoiMjAyMS0wOS0wOCAwNzoyMzoyNCIsInVzZXJuYW1lIjoiaG9seW5hdGlvbmRldmVsb3BtZW50QGdtYWlsLmNvbSIsInVzZXJuYW1lXzIiOiIwODEwOTk5NDQ4NSIsInVzZXJfdHlwZSI6ImN1c3RvbWVyIiwidXNlcl90YWJsZV9pZCI6IjEiLCJ0b2tlbiI6bnVsbCwibGFzdF9sb2dpbiI6IjIwMjItMDEtMjYgMTI6NDU6MzMiLCJhY3Rpdml0eV9sb2ciOiIxIiwibGFzdF9sb2dvdXQiOm51bGwsImxhc3RfY2hhbmdlX3Bhc3N3b3JkIjoiMjAyMS0wOS0yMiAwOTo0NzowNyJ9.FaS1kiBuZOrfWj1rvZBhWNNlX5o3kvBsRkS6Nf34sYA',
        details: userInfo,
      },
    })
  );
});

export const signInWithEmailFailure = rest.post('/auth', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: false,
      message: 'invalid username or password',
      payload: false,
    })
  );
});

export const getUserInfoSuccess = rest.post('/auth', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: true,
      message: 'User information fetched successfully',
      payload: userInfo,
    })
  );
});

export const getUserInfoFailure = rest.post('/auth', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: false,
      message: 'User is unauthenticated',
      payload: false,
    })
  );
});
