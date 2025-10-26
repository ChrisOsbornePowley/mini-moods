'use client';
import { useRouter } from 'next/navigation';
import MoodPicker from '@/app/components/MoodPicker';

export default function NewMoodPage() {
	const router = useRouter();
	return <MoodPicker onSuccess={() => router.push('/history')} />;
}
