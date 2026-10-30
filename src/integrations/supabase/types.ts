export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      assignment_submissions: {
        Row: {
          answers: Json
          assignment_id: string
          score: number
          seconds: number
          submitted_at: string
          user_id: string
        }
        Insert: {
          answers: Json
          assignment_id: string
          score: number
          seconds?: number
          submitted_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          assignment_id?: string
          score?: number
          seconds?: number
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "batch_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      attempts: {
        Row: {
          chosen_option_id: string
          context: string
          correct: boolean
          created_at: string
          exam: string
          id: string
          question_id: string
          seconds: number
          subject: string
          topic: string
          user_id: string
        }
        Insert: {
          chosen_option_id: string
          context?: string
          correct: boolean
          created_at?: string
          exam?: string
          id?: string
          question_id: string
          seconds?: number
          subject: string
          topic?: string
          user_id: string
        }
        Update: {
          chosen_option_id?: string
          context?: string
          correct?: boolean
          created_at?: string
          exam?: string
          id?: string
          question_id?: string
          seconds?: number
          subject?: string
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      batch_assignments: {
        Row: {
          batch_id: string
          created_at: string
          created_by: string
          due_at: string | null
          id: string
          question_ids: string[]
          title: string
        }
        Insert: {
          batch_id: string
          created_at?: string
          created_by: string
          due_at?: string | null
          id?: string
          question_ids: string[]
          title: string
        }
        Update: {
          batch_id?: string
          created_at?: string
          created_by?: string
          due_at?: string | null
          id?: string
          question_ids?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_assignments_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_members: {
        Row: {
          batch_id: string
          joined_at: string
          pro_granted: boolean
          user_id: string
        }
        Insert: {
          batch_id: string
          joined_at?: string
          pro_granted?: boolean
          user_id: string
        }
        Update: {
          batch_id?: string
          joined_at?: string
          pro_granted?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "batch_members_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          active: boolean
          created_at: string
          exam: string
          id: string
          institute_id: string
          join_code: string
          name: string
          pro_days: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          exam?: string
          id?: string
          institute_id: string
          join_code: string
          name: string
          pro_days?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          exam?: string
          id?: string
          institute_id?: string
          join_code?: string
          name?: string
          pro_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "batches_institute_id_fkey"
            columns: ["institute_id"]
            isOneToOne: false
            referencedRelation: "institutes"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          created_at: string
          exam: string
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exam?: string
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          exam?: string
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: []
      }
      coupon_redemptions: {
        Row: {
          code: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          code: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          code?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["code"]
          },
        ]
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string
          expires_at: string
          max_redemptions: number | null
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string
          expires_at: string
          max_redemptions?: number | null
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string
          expires_at?: string
          max_redemptions?: number | null
        }
        Relationships: []
      }
      flashcard_reviews: {
        Row: {
          card_id: string
          created_at: string
          deck: string
          difficulty: number
          due_at: string
          exam: string
          lapses: number
          last_rating: number
          last_review_at: string
          reps: number
          stability: number
          user_id: string
        }
        Insert: {
          card_id: string
          created_at?: string
          deck?: string
          difficulty: number
          due_at: string
          exam?: string
          lapses?: number
          last_rating: number
          last_review_at?: string
          reps?: number
          stability: number
          user_id: string
        }
        Update: {
          card_id?: string
          created_at?: string
          deck?: string
          difficulty?: number
          due_at?: string
          exam?: string
          lapses?: number
          last_rating?: number
          last_review_at?: string
          reps?: number
          stability?: number
          user_id?: string
        }
        Relationships: []
      }
      flashcards_custom: {
        Row: {
          back: string
          created_at: string
          deck: string
          exam: string
          front: string
          id: string
          user_id: string
        }
        Insert: {
          back: string
          created_at?: string
          deck?: string
          exam?: string
          front: string
          id?: string
          user_id: string
        }
        Update: {
          back?: string
          created_at?: string
          deck?: string
          exam?: string
          front?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          completed: boolean
          created_at: string
          escapes: number
          exam: string
          id: string
          minutes: number
          planned_minutes: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          escapes?: number
          exam?: string
          id?: string
          minutes?: number
          planned_minutes?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          escapes?: number
          exam?: string
          id?: string
          minutes?: number
          planned_minutes?: number
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      friend_challenges: {
        Row: {
          created_at: string
          creator: string
          creator_answers: Json | null
          creator_score: number | null
          creator_seconds: number | null
          exam: string
          expires_at: string
          id: string
          opponent: string
          opponent_answers: Json | null
          opponent_score: number | null
          opponent_seconds: number | null
          question_ids: string[]
        }
        Insert: {
          created_at?: string
          creator: string
          creator_answers?: Json | null
          creator_score?: number | null
          creator_seconds?: number | null
          exam?: string
          expires_at?: string
          id?: string
          opponent: string
          opponent_answers?: Json | null
          opponent_score?: number | null
          opponent_seconds?: number | null
          question_ids: string[]
        }
        Update: {
          created_at?: string
          creator?: string
          creator_answers?: Json | null
          creator_score?: number | null
          creator_seconds?: number | null
          exam?: string
          expires_at?: string
          id?: string
          opponent?: string
          opponent_answers?: Json | null
          opponent_score?: number | null
          opponent_seconds?: number | null
          question_ids?: string[]
        }
        Relationships: []
      }
      friendships: {
        Row: {
          created_at: string
          requested_by: string
          status: string
          user_a: string
          user_b: string
        }
        Insert: {
          created_at?: string
          requested_by: string
          status: string
          user_a: string
          user_b: string
        }
        Update: {
          created_at?: string
          requested_by?: string
          status?: string
          user_a?: string
          user_b?: string
        }
        Relationships: []
      }
      game_profiles: {
        Row: {
          best_combo: number
          best_combo_today: number
          combo_day: string | null
          created_at: string
          current_combo: number
          daily_goal: number
          exam: string
          last_attempt_at: string | null
          last_streak_day: string | null
          league_opt_out: boolean
          league_tier: number
          longest_streak: number
          streak: number
          streak_freezes: number
          timezone: string
          updated_at: string
          user_id: string
          xp_total: number
        }
        Insert: {
          best_combo?: number
          best_combo_today?: number
          combo_day?: string | null
          created_at?: string
          current_combo?: number
          daily_goal?: number
          exam?: string
          last_attempt_at?: string | null
          last_streak_day?: string | null
          league_opt_out?: boolean
          league_tier?: number
          longest_streak?: number
          streak?: number
          streak_freezes?: number
          timezone?: string
          updated_at?: string
          user_id: string
          xp_total?: number
        }
        Update: {
          best_combo?: number
          best_combo_today?: number
          combo_day?: string | null
          created_at?: string
          current_combo?: number
          daily_goal?: number
          exam?: string
          last_attempt_at?: string | null
          last_streak_day?: string | null
          league_opt_out?: boolean
          league_tier?: number
          longest_streak?: number
          streak?: number
          streak_freezes?: number
          timezone?: string
          updated_at?: string
          user_id?: string
          xp_total?: number
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          exam: string
          id: string
          target_at: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exam?: string
          id?: string
          target_at: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          exam?: string
          id?: string
          target_at?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      institute_staff: {
        Row: {
          added_at: string
          institute_id: string
          role: string
          user_id: string
        }
        Insert: {
          added_at?: string
          institute_id: string
          role: string
          user_id: string
        }
        Update: {
          added_at?: string
          institute_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institute_staff_institute_id_fkey"
            columns: ["institute_id"]
            isOneToOne: false
            referencedRelation: "institutes"
            referencedColumns: ["id"]
          },
        ]
      }
      institutes: {
        Row: {
          city: string
          created_at: string
          created_by: string
          id: string
          name: string
          verified: boolean
        }
        Insert: {
          city?: string
          created_at?: string
          created_by: string
          id?: string
          name: string
          verified?: boolean
        }
        Update: {
          city?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          verified?: boolean
        }
        Relationships: []
      }
      league_memberships: {
        Row: {
          cohort: number
          created_at: string
          exam: string
          tier: number
          user_id: string
          week_start: string
        }
        Insert: {
          cohort: number
          created_at?: string
          exam?: string
          tier: number
          user_id: string
          week_start: string
        }
        Update: {
          cohort?: number
          created_at?: string
          exam?: string
          tier?: number
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      mistake_queue: {
        Row: {
          created_at: string
          due_at: string
          exam: string
          question_id: string
          stage: number
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          due_at?: string
          exam?: string
          question_id: string
          stage?: number
          subject?: string
          user_id: string
        }
        Update: {
          created_at?: string
          due_at?: string
          exam?: string
          question_id?: string
          stage?: number
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      monthly_event_awards: {
        Row: {
          awarded_at: string
          exam: string
          month: string
        }
        Insert: {
          awarded_at?: string
          exam: string
          month: string
        }
        Update: {
          awarded_at?: string
          exam?: string
          month?: string
        }
        Relationships: []
      }
      pro_grants: {
        Row: {
          created_at: string
          days: number
          id: string
          source: string
          until: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days: number
          id?: string
          source: string
          until: string
          user_id: string
        }
        Update: {
          created_at?: string
          days?: number
          id?: string
          source?: string
          until?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
          onboarded_at: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string
          id: string
          onboarded_at?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          onboarded_at?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_option_id: string
          created_at: string
          difficulty: string
          distractors: Json
          exam: string
          explanation: string
          high_yield: string
          id: string
          image_url: string | null
          is_pyq: boolean
          one_liner: string
          options: Json
          pyq_year: number | null
          repeat_count: number | null
          source: string | null
          stem: string
          subject: string
          topic: string
        }
        Insert: {
          correct_option_id: string
          created_at?: string
          difficulty?: string
          distractors?: Json
          exam?: string
          explanation: string
          high_yield?: string
          id?: string
          image_url?: string | null
          is_pyq?: boolean
          one_liner: string
          options: Json
          pyq_year?: number | null
          repeat_count?: number | null
          source?: string | null
          stem: string
          subject: string
          topic: string
        }
        Update: {
          correct_option_id?: string
          created_at?: string
          difficulty?: string
          distractors?: Json
          exam?: string
          explanation?: string
          high_yield?: string
          id?: string
          image_url?: string | null
          is_pyq?: boolean
          one_liner?: string
          options?: Json
          pyq_year?: number | null
          repeat_count?: number | null
          source?: string | null
          stem?: string
          subject?: string
          topic?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          qualified_at: string | null
          referee: string
          referrer: string
          referrer_days: number
          rewarded_at: string | null
        }
        Insert: {
          created_at?: string
          qualified_at?: string | null
          referee: string
          referrer: string
          referrer_days?: number
          rewarded_at?: string | null
        }
        Update: {
          created_at?: string
          qualified_at?: string | null
          referee?: string
          referrer?: string
          referrer_days?: number
          rewarded_at?: string | null
        }
        Relationships: []
      }
      study_roadmaps: {
        Row: {
          done: string[]
          exam: string
          goal: string
          goal_key: string
          opened_at: string
          roadmap: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          done?: string[]
          exam?: string
          goal: string
          goal_key: string
          opened_at?: string
          roadmap: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          done?: string[]
          exam?: string
          goal?: string
          goal_key?: string
          opened_at?: string
          roadmap?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount_inr: number
          created_at: string
          current_period_end: string
          environment: string
          id: string
          note: string
          paddle_customer_id: string | null
          paddle_transaction_id: string | null
          plan: string
          price_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_inr?: number
          created_at?: string
          current_period_end: string
          environment?: string
          id?: string
          note?: string
          paddle_customer_id?: string | null
          paddle_transaction_id?: string | null
          plan?: string
          price_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_inr?: number
          created_at?: string
          current_period_end?: string
          environment?: string
          id?: string
          note?: string
          paddle_customer_id?: string | null
          paddle_transaction_id?: string | null
          plan?: string
          price_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          exam: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          badge_id: string
          exam?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          exam?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      xp_events: {
        Row: {
          amount: number
          created_at: string
          day: string
          exam: string
          id: string
          ref_id: string
          source: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          day: string
          exam?: string
          id?: string
          ref_id?: string
          source: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          day?: string
          exam?: string
          id?: string
          ref_id?: string
          source?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invite: { Args: { _username: string }; Returns: string }
      add_institute_staff: {
        Args: { _institute: string; _username: string }
        Returns: undefined
      }
      admin_engagement: { Args: { _days?: number }; Returns: Json }
      admin_list_institutes: { Args: never; Returns: Json }
      admin_verify_institute: {
        Args: { _id: string; _verified: boolean }
        Returns: undefined
      }
      assignment_results: { Args: { _id: string }; Returns: Json }
      batch_dashboard: { Args: { _batch: string }; Returns: Json }
      batch_preview: { Args: { _code: string }; Returns: Json }
      claim_xp: {
        Args: { _exam?: string; _ref: string; _source: string }
        Returns: number
      }
      coupon_access_until: { Args: { _user_id: string }; Returns: string }
      create_assignment: {
        Args: {
          _batch: string
          _due_at?: string
          _question_ids: string[]
          _title: string
        }
        Returns: string
      }
      create_batch: {
        Args: {
          _exam: string
          _institute: string
          _name: string
          _pro_days?: number
        }
        Returns: string
      }
      create_challenge: {
        Args: { _exam: string; _opponent: string; _question_ids: string[] }
        Returns: string
      }
      create_institute: {
        Args: { _city?: string; _name: string }
        Returns: string
      }
      delete_assignment: { Args: { _id: string }; Returns: undefined }
      game_award_badge: {
        Args: { _badge: string; _exam: string; _uid: string }
        Returns: undefined
      }
      game_check_badges: {
        Args: { _exam: string; _uid: string }
        Returns: undefined
      }
      game_daily_quests: {
        Args: { _day: string; _exam: string; _uid: string }
        Returns: {
          metric: string
          quest_key: string
          reward: number
          target: number
          title: string
        }[]
      }
      game_ensure_profile: {
        Args: { _exam: string; _uid: string }
        Returns: {
          best_combo: number
          best_combo_today: number
          combo_day: string | null
          created_at: string
          current_combo: number
          daily_goal: number
          exam: string
          last_attempt_at: string | null
          last_streak_day: string | null
          league_opt_out: boolean
          league_tier: number
          longest_streak: number
          streak: number
          streak_freezes: number
          timezone: string
          updated_at: string
          user_id: string
          xp_total: number
        }
        SetofOptions: {
          from: "*"
          to: "game_profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      game_grant_xp: {
        Args: {
          _amount: number
          _exam: string
          _ref: string
          _source: string
          _uid: string
        }
        Returns: number
      }
      game_local_day: { Args: { _exam: string; _uid: string }; Returns: string }
      game_quest_catalogue: {
        Args: never
        Returns: {
          metric: string
          quest_key: string
          reward: number
          target: number
          title: string
        }[]
      }
      game_quest_metric: {
        Args: { _day: string; _exam: string; _metric: string; _uid: string }
        Returns: number
      }
      game_settle_streak: {
        Args: { _exam: string; _uid: string }
        Returns: number
      }
      game_valid_exam: { Args: { _exam: string }; Returns: string }
      get_friends: { Args: { _exam?: string }; Returns: Json }
      get_game_state: { Args: { _exam?: string }; Returns: Json }
      get_league: { Args: { _exam?: string }; Returns: Json }
      get_monthly_event: { Args: { _exam?: string }; Returns: Json }
      grant_pro_days: {
        Args: { _days: number; _source: string; _uid: string }
        Returns: string
      }
      has_active_subscription: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      institute_new_code: { Args: never; Returns: string }
      is_batch_staff: { Args: { _batch: string }; Returns: boolean }
      is_institute_staff: {
        Args: { _institute: string; _owner_only?: boolean }
        Returns: boolean
      }
      is_pro: { Args: { _user_id: string }; Returns: boolean }
      join_batch: { Args: { _code: string }; Returns: Json }
      leave_batch: { Args: { _batch: string }; Returns: undefined }
      list_challenges: { Args: { _exam?: string }; Returns: Json }
      my_batches: { Args: { _exam?: string }; Returns: Json }
      my_coupon_access: { Args: never; Returns: string }
      my_referrals: { Args: never; Returns: Json }
      record_referral: { Args: { _username: string }; Returns: string }
      redeem_coupon: { Args: { _code: string }; Returns: Json }
      remove_friend: { Args: { _other: string }; Returns: undefined }
      remove_institute_staff: {
        Args: { _institute: string; _user: string }
        Returns: undefined
      }
      request_friend: { Args: { _username: string }; Returns: string }
      respond_friend: {
        Args: { _accept: boolean; _other: string }
        Returns: string
      }
      review_flashcard: {
        Args: {
          _card_id: string
          _deck?: string
          _difficulty: number
          _due_at: string
          _exam?: string
          _rating: number
          _stability: number
        }
        Returns: number
      }
      set_username: { Args: { _name: string }; Returns: string }
      social_are_friends: { Args: { _x: string; _y: string }; Returns: boolean }
      social_user_by_name: { Args: { _name: string }; Returns: string }
      staff_overview: { Args: never; Returns: Json }
      submit_assignment: {
        Args: { _answers: Json; _id: string; _seconds: number }
        Returns: Json
      }
      submit_challenge: {
        Args: { _answers: Json; _id: string; _seconds: number }
        Returns: Json
      }
      update_batch: {
        Args: { _active: boolean; _batch: string; _rotate_code?: boolean }
        Returns: string
      }
      update_game_settings: {
        Args: {
          _daily_goal?: number
          _exam?: string
          _league_opt_out?: boolean
          _timezone?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
