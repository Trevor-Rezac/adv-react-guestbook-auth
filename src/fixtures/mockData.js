const mockedToken = {
  access_token: 'MOCKED_ACCESS_TOKEN',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'MOCKED_REFRESH_TOKEN',
  user: {
    id: '123456',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'trev@rez.com',
    email_confirmed_at: '2022-05-06T16:42:03.396641Z',
    phone: '',
    confirmed_at: '2022-05-06T16:42:03.396641Z',
    last_sign_in_at: '2022-05-09T21:04:29.052730661Z',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {},
    identities: [
      {
        id: '123456',
        user_id: '123456',
        identity_data: {
          sub: '123456',
        },
        provider: 'email',
        last_sign_in_at: '2022-05-06T16:42:03.39489Z',
        created_at: '2022-05-06T16:42:03.394937Z',
        updated_at: '2022-05-06T16:42:03.394941Z',
      },
    ],
    created_at: '2022-05-06T16:42:03.391715Z',
    updated_at: '2022-05-09T21:04:29.053838Z',
  },
};

module.exports = { mockedToken };
