import math


def build_pagination(items: list, total: int, page: int, limit: int, items_key: str) -> dict:
    total_pages = math.ceil(total / limit) if total > 0 else 1
    return {'total': total, 'page': page, 'total_pages': total_pages, items_key: items}
