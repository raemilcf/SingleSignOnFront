export interface OktaUserinfo{
    sub:string,
  name :string,
  nickname :string,
  given_name :string,
  middle_name :string,
  family_name :string,
  profile :string,
  zoneinfo :string,
  locale :string,
  updated_at :Date,
  email: string ,
  email_verified: boolean,
  address: any [],
  phone_number : string ,
}