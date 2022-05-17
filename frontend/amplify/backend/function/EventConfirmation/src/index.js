/*
 * @Author: Shen Shu
 * @Date: 2022-05-16 22:31:01
 * @LastEditors: Shen Shu
 * @LastEditTime: 2022-05-17 13:25:23
 * @FilePath: \uwcssa_ca\frontend\amplify\backend\function\EventConfirmation\src\index.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });

exports.handler = async (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);
    if (record.eventName === "INSERT") {
      console.log(record.dynamodb.NewImage.userID.S);
      console.log(record.dynamodb.NewImage.email.S);
      console.log(record.dynamodb.NewImage.name.S);
      console.log(record.dynamodb.NewImage.phone.S);
      console.log(record.dynamodb.NewImage.message.S);
      console.log(record.dynamodb.NewImage.id.S);
      console.log(record.dynamodb.NewImage.numberOfPeople.N);

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [record.dynamodb.NewImage.email.S],
          },
          Source: `"uwcssa.ca" <admin@uwcssa.ca>`,
          Message: {
            Subject: {
              Data: `活动回执`,
            },
            Body: {
              Text: {
                Data: `恭喜您已经成功报名
                \n\nShen Shu\n有任何问题请发邮件至: uwincssa.it@gmail.com`,
              },
            },
          },
        })
        .promise();
      await ses
        .sendEmail({
          Destination: {
            ToAddresses: ["shikaijin7@gmail.com", "shushen2013@gmail.com"],
          },
          Source: `"uwcssa.ca" <admin@uwcssa.ca>`,
          Message: {
            Subject: {
              Data: `有人参加了活动${record.dynamodb.NewImage.userID.S}`,
            },
            Body: {
              Text: {
                Data: `恭喜您已经成功报名
                \n\nShen Shu\n有任何问题请发邮件至: uwincssa.it@gmail.com`,
              },
            },
          },
        })
        .promise();
    }
  }
  return Promise.resolve("Successfully processed DynamoDB record");
};
