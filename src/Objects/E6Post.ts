export interface E6Post {
    id: number;
    created_at: string;
    updated_at: string;
    file: {
        width: number;
        height: number;
        ext: string;
        size: number;
        md5: string;
        url: string;
    };
    preview: {
        width: number;
        height: number;
        url: string;
    };
    sample: {
        has: boolean;
        height: number;
        width: number;
        url: string;
        alternates: any;
    };
    score: {
        up: number;
        down: number;
        total: number;
    };
    tags: {
        general: string[];
        artist: string[];
        copyright: string[];
        character: string[];
        species: string[];
        invalid: string[];
        meta: string[];
        lore: string[];
    };
    locked_tags: string[];
    change_seq: number;
    flags: {
        pending: boolean;
        flagged: boolean;
        note_locked: boolean;
        status_locked: boolean;
        rating_locked: boolean;
        deleted: boolean;
    };
    rating: string;
    fav_count: number;
    sources: string[];
    pools: any[];
    relationships: {
        parent_id: null;
        has_children: boolean;
        has_active_children: boolean;
        children: any[];
    };
    approver_id: null;
    uploader_id: number;
    description: string;
    comment_count: number;
    is_favorited: boolean;
    has_notes: boolean;
    duration: null|number;
}

export class E6Post {

    constructor(post: E6Post) {
        Object.assign(this, post);
    }
}