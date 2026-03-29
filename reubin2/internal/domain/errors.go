package domain

import "errors"

var (
	ErrNotFound     = errors.New("not found")
	ErrInvalidInput = errors.New("invalid input")
	ErrFetchFailed  = errors.New("fetch failed")
	ErrParseFailed  = errors.New("parse failed")
)
