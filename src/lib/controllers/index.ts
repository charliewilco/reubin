import { UserController } from './user'
import * as EntryController from './entry'
import { FeedController } from './feed'
import { TagController } from './tag'
import { SessionController } from './session'

export const feed = new FeedController()
export const entry = EntryController
export const tags = new TagController()
export const users = new UserController()
export const session = new SessionController()

export const Controllers = {
	feed,
	entry,
	tags,
	users,
	session,
}
