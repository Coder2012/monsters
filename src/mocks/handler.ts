import { rest } from 'msw';

export const handlers = [
  rest.get('https://monsters-rewards.herokuapp.com/kids', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '629cf0e0fd8f0f426c696b4e',
          firstName: 'Ethan',
          lastName: 'Brown',
          monster: '7',
          points: 30,
          taskList: [
            '6289248fe4f23866375446d7',
            '62892487e4f23866375446d6',
            '6289246ee4f23866375446d5',
            '6289245ee4f23866375446d4',
            '62892487e4f23866375446d6',
          ],
          createdAt: '2022-06-05T18:07:28.553Z',
        },
        {
          id: '629cf0f0fd8f0f426c696b4f',
          firstName: 'Isaac',
          lastName: 'Brown',
          monster: '3',
          points: 0,
          taskList: [],
          createdAt: '2022-06-05T18:07:44.186Z',
        },
      ]),
      ctx.delay(10)
    );
  }),
  rest.get('https://monsters-rewards.herokuapp.com/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '62892456e4f23866375446d3',
          title: 'Piano',
          points: 10,
          createdAt: '2022-05-21T17:41:42.484Z',
        },
        {
          id: '6289245ee4f23866375446d4',
          title: 'Tuition',
          points: 10,
          createdAt: '2022-05-21T17:41:50.034Z',
        },
        {
          id: '6289246ee4f23866375446d5',
          title: 'Make your bed',
          points: 5,
          createdAt: '2022-05-21T17:42:06.694Z',
        },
      ])
    );
  }),
];
