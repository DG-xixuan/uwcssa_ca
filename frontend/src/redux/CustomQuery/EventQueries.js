export const eventSortBySortKey = /* GraphQL */ `
  query EventSortBySortKey(
    $sortKey: SortKey!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventSortBySortKey(
      sortKey: $sortKey
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        startDate
        endDate
        online
        posterImgURL
        address {
          description
        }
        active
        createdAt
        topic {
          id
          name
        }
        updatedAt
      }
      nextToken
    }
  }
`;

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      startDate
      endDate
      online
      group
      summary
      posterImgURL
      qrCodeImgURL
      backGroundImgURL
      content
      address {
        description
        place_id
        reference
        terms
        types
        apartmentNumbers
      }
      sponsor
      tags
      eventStatus
      active
      createdAt
      sortKey
      topicID
      userID
      updatedAt
      user {
        id
        username
        owner
        avatarImgURL
        badges
      }
      eventComments {
        items {
          id
          content
          active
          eventID
          createdAt
          userID
          updatedAt
          owner
          likes {
            items {
              id
              like
              itemID
              userID
              createdAt
              updatedAt
              owner
              user {
                id
                username
                owner
                avatarImgURL
                badges
              }
            }
            nextToken
          }
          user {
            id
            username
            owner
            avatarImgURL
            badges
          }
          eventSubComments {
            items {
              id
              content
              active
              eventCommentID
              createdAt
              userID
              updatedAt
              owner
              likes {
                items {
                  id
                  like
                  itemID
                  userID
                  createdAt
                  updatedAt
                  owner
                  user {
                    id
                    username
                    owner
                    avatarImgURL
                    badges
                  }
                }
                nextToken
              }
              user {
                id
                username
                owner
                avatarImgURL
                badges
              }
            }
            nextToken
          }
        }
        nextToken
      }
      eventParticipants {
        items {
          id
          userID
        }
        nextToken
      }
      likes {
        items {
          id
          like
          itemID
          userID
          createdAt
          updatedAt
          owner
          user {
            id
            username
            owner
            avatarImgURL
            badges
          }
        }
        nextToken
      }
      topic {
        id
      }
    }
  }
`;
