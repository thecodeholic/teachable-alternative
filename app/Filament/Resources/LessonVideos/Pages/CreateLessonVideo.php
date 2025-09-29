<?php

namespace App\Filament\Resources\LessonVideos\Pages;

use App\Filament\Resources\LessonVideos\LessonVideoResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLessonVideo extends CreateRecord
{
    protected static string $resource = LessonVideoResource::class;
}
