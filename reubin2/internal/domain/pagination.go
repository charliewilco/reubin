package domain

const (
	DefaultLimit = 50
	MaxLimit     = 200
)

type Pagination struct {
	Limit  int
	Offset int
}

func NormalizePagination(limit, offset int) Pagination {
	if limit <= 0 {
		limit = DefaultLimit
	}
	if limit > MaxLimit {
		limit = MaxLimit
	}
	if offset < 0 {
		offset = 0
	}
	return Pagination{Limit: limit, Offset: offset}
}
